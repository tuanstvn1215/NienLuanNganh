const Controller = require('../../core/controller')
const ProductCategoryModel = require('../../models/productCategory.model')
class ProductCategoryController extends Controller {
    constructor() {
        super()
    }

    store = async (req, res) => {
        try {
            console.log('gg')
            console.log(req.body)
            const categoryname = req.body.categoryname
            await ProductCategoryModel.insertMany({
                name: categoryname,
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
            ProductCategoryModel.findByIdAndUpdate(req.query.id, {
                $set: { name: req.body.categoryname },
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
            ProductCategoryModel.findByIdAndDelete(req.query.id)
            res.send({ code: 200, message: 'lưu thành công' })
        } catch (error) {
            res.send({
                code: 502,
                message: 'lưu thất bại vì lỗi: ' + error.message,
            })
        }
    }
}
module.exports = new ProductCategoryController()
