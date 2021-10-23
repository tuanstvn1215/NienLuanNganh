const Controller = require('../../core/controller')
class productController extends Controller {
    constructor() {
        super()
    }
    show = async (req, res) => {
        res.render('shop/productdetail', {})
    }
}
module.exports = new productController()
