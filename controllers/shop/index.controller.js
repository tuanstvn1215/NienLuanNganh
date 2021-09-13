const Controller = require('../../core/controller')
class IndexController extends Controller {
    constructor() {
        super()
    }
    getIndex = async (req, res) => {
        res.render('shop/index', {})
    }
}
module.exports = new IndexController()
