const Controller = require('../../core/controller')

class ProductController extends Controller {
    constructor() {
        super()
    }
    show = async (req, res) => {
        res.render('admin/product', {})
    }
    create = async (req, res) => {
        res.render('admin/add_product', {})
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
