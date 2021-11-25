const Controller = require('../../core/controller')
const ProductModel = require('../../models/product.model')
const CommentModel = require('../../models/comment.model')
const ProductCategoryModel = require('../../models/productCategory.model')
const ProductProvierderModel = require('../../models/productProvider.model')
const RateModel = require('../../models/rate.model')

class productController extends Controller {
    constructor() {
        super()
    }
    index = async (req, res) => {
        const productProvider = await ProductProvierderModel.find({
            status: 1,
        })
        let page = 0
        if (req.query.page) page = parseInt(req.query.page)
        let name = req.query.name
        let searchqueryfinal = {
            name: new RegExp(name),

            status: { $ne: 0 },
        }
        let searchquery = { name: name }

        if (req.query.category) {
            searchqueryfinal.category = req.query.category
            searchquery.category = req.query.category
        }
        if (req.query.provider) {
            searchqueryfinal.provider = req.query.provider
            searchquery.provider = req.query.provider
        }
        if (req.query.price) {
            searchquery.price = parseInt(req.query.price)
        }
        let queryString = ''
        for (let i in searchquery) {
            const element = searchquery[i]
            if (i) queryString += '&' + i + '=' + element
        }
        let product
        let productCategory = await ProductCategoryModel.find({ status: 1 })
        if (req.query.price)
            product = await ProductModel.find(searchqueryfinal).sort({
                price: searchquery.price,
            })
        else product = await ProductModel.find(searchqueryfinal)
        // product = product.filter((value, index, arr) => {
        //     return (value.price >= price[0]) & (value.price <= price[1])
        // })
        product = product.filter((value, index, arr) => {
            return (index >= page * 12) & (index < (page + 1) * 12)
        })
        console.log(productCategory)
        res.render('shop/product', {
            user: res.locals.user,
            productProvider: productProvider,
            productCategory: productCategory,
            page: page,
            queryString: queryString,
            product: product,
        })
    }
    show = async (req, res) => {
        let product_id = req.query.id
        let all_star_value = await RateModel.find({
            product: product_id,
        })
        let msg
        let stars_value = 0
        if (all_star_value.length >= 0) {
            for (let index = 0; index < all_star_value.length; index++) {
                const element = all_star_value[index]
                stars_value += element.value
            }
            stars_value = Math.round(stars_value / all_star_value.length)
        }

        msg = await CommentModel.find({ product: product_id })
            .populate('user')
            .sort({ date: -1 })
        for (let index = 0; index < msg.length; index++) {
            msg[index].datestr = msg[index].date.toLocaleString()
        }

        let product = await ProductModel.findById(product_id)
            .populate('category')
            .populate('provider')
        res.render('shop/productdetail', {
            product: product,
            stars_value: stars_value,
            msg: msg,
        })
    }
    findOne = async (req, res) => {
        let id = req.query.id
        let product = await ProductModel.findById(id)
        res.send(product)
    }
    rate = async (req, res) => {
        let user_id = res.locals.user.info.id
        let product_id = req.query.product_id
        let star_value = req.query.stars
        try {
            await RateModel.updateOne(
                {
                    product: product_id,
                    user: user_id,
                },
                {
                    product: product_id,
                    user: user_id,
                    value: star_value,
                }
            ).then(async (reps) => {
                if (reps.modifiedCount == 0) {
                    await RateModel.insertMany({
                        product: product_id,
                        user: user_id,
                        value: star_value,
                    })
                }
            })
            res.send({ code: 200, message: 'Đánh giá thành công' })
        } catch (error) {
            res.send({ code: 500, message: 'Có lỗi xảy ra' })
        }
    }
    comment = async (req, res) => {
        let user_id = res.locals.user.info.id
        let product = req.body.product
        let message = req.body.message
        console.log(req.body)
        try {
            await CommentModel.insertMany({
                user: user_id,
                product,
                message: message,
            })
            res.send(res.send({ code: 200, message: 'Đánh giá thành công' }))
        } catch (error) {}
    }
    getComment = async (req, res) => {}

    getStars = async (req, res) => {}
}
module.exports = new productController()
