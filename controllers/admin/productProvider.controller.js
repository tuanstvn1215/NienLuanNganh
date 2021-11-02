const Controller = require('../../core/controller')
const ProductProviderModel = require('../../models/productProvider.model')
class ProductProviderController extends Controller {
    constructor() {
        super()
    }
    store = async (req, res) => {
        try {
            const name = req.body.name
            await ProductProviderModel.insertMany({
                name: name,
                status: 1,
            })
            res.send({ code: 200, message: 'lưu thành công' })
        } catch (error) {
            res.send({
                code: 502,
                message: 'lưu thất bại vì lỗi: ' + error.message,
            })
        }
    }

    edit = async (req, res) => {
        try {
            console.log(req.params.id + req.body.name)
            const name = req.body.name
            await ProductProviderModel.findByIdAndUpdate(req.params.id, {
                $set: { name: name },
            })

            res.send({ code: 200, message: 'lưu thành công' })
        } catch (error) {
            res.send({
                code: 502,
                message: 'lưu thất bại vì lỗi: ' + error.message,
            })
        }
    }
    delete = async (req, res) => {
        try {
            await ProductProviderModel.findByIdAndDelete(req.params.id)
            res.send({ code: 200, message: 'lưu thành công' })
        } catch (error) {
            res.send({
                code: 502,
                message: 'lưu thất bại vì lỗi: ' + error.message,
            })
        }
    }
}
module.exports = new ProductProviderController()
