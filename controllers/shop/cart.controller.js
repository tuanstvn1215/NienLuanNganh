const Controller = require('../../core/controller')
const BillModel = require('../../models/bill.model')
const paypalSDK = require('@paypal/checkout-server-sdk')
const { response } = require('express')

class CardController extends Controller {
    constructor() {
        super()
        const clientId =
            'ASrRqf_Fhck2YsA2zuSmrAV4neGcDg5KhCKFcQCV8MGG7ge1RHPBqEbBuH9TOAyPbPrfIDdnMDEj8vXm'
        const clientSecret =
            'ELbrDb279YIYtyH8Hkm6lfkTcehvhwcLuway22IpeKgPPc1g1WGCUkj4EU9cwFroct7c6Qq-0jPCuUM4'
        // Tạo env và paypalclient
        this.environment = new paypalSDK.core.SandboxEnvironment(
            clientId,
            clientSecret
        )
        this.paypalclient = new paypalSDK.core.PayPalHttpClient(
            this.environment
        )
    }
    getIndex = async (req, res) => {
        res.render('shop/cart', { user: res.locals.user })
    }
    checkout = async (req, res) => {
        const bill = (
            await BillModel.insertMany({ value: 1000.12, status: 0 })
        )[0]
        console.log(res.locals)
        const successUrl =
            (req.headers['x-forwarded-proto']
                ? req.headers['x-forwarded-proto'] + '://'
                : 'http://') +
            req.headers.host +
            '/cart/success/' +
            bill.id
        const cancleUrl =
            (req.headers['x-forwarded-proto']
                ? req.headers['x-forwarded-proto'] + '://'
                : 'http://') +
            req.headers.host +
            '/cart'
        //   tạo request đến paypal
        let request = new paypalSDK.orders.OrdersCreateRequest()
        request.requestBody({
            application_context: {
                return_url: successUrl,
                cancel_url: cancleUrl,
                brand_name: 'KTQ SHOP',
                landing_page: 'BILLING',
                user_action: 'CONTINUE',
            },
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: '' + bill.value,
                    },
                },
            ],
        })

        // thực hiện request và lưu vào biến response
        let response = await this.paypalclient.execute(request).catch((ex) => {
            console.log(ex)
            res.send('xảy ra lỗi')
        })

        console.log(response.result.links)
        // redirect người dùng đến trang thanh toán của paypal
        response.result.links.forEach((item, index) => {
            if (item.rel == 'approve') {
                console.log(item.href)
                res.redirect(item.href)
                return
            }
        })
    }
    success = async (req, res) => {
        const request = new paypalSDK.orders.OrdersCaptureRequest(
            req.query.token
        )
        let bill
        const response = await this.paypalclient
            .execute(request)
            .catch((ex) => {
                res.send('lỗi rồi đại vương ơi')
            })
        if (response.result.status == 'COMPLETED')
            bill = await BillModel.findByIdAndUpdate(req.params.billid, {
                set: { status: 1 },
            })

        res.render('shop/resultCheckout', {
            billid: req.params.billid,
            status: response.result.status,
        })
    }
}
module.exports = new CardController()
