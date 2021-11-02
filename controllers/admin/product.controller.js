const Controller = require('../../core/controller')
const ProductCategoryModel = require('../../models/productCategory.model')
const ProductProviderModel = require('../../models/productProvider.model')
class ProductController extends Controller {
    constructor() {
        super()
    }
    show = async (req, res) => {
        const product_category = await ProductCategoryModel.find({ status: 1 })

        res.render('admin/product', { product_category: product_category })
    }
    create = async (req, res) => {
        const product_category = await ProductCategoryModel.find({ status: 1 })
        const product_provider = await ProductProviderModel.find({ status: 1 })

        res.render('admin/add_product', {
            product_category: product_category,
            product_provider: product_provider,
            ref: req.originalUrl,
        })
    }
    store = async (req, res) => {
        try {
            res.send({ code: 200, message: 'lưu thành công' })
        } catch (error) {
            res.send({
                code: 502,
                message: 'lưu thất bại vì lỗi: ' + error.message,
            })
        }
    }
    detele = async (req, res) => {
        try {
        } catch (error) {}
    }
}

module.exports = new ProductController()
