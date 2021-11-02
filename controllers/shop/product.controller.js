const Controller = require('../../core/controller')
class productController extends Controller {
    constructor() {
        super()
    }
    show = async (req, res) => {
        res.render('shop/productdetail', { user: res.locals.user })
    }
}
module.exports = new productController()
