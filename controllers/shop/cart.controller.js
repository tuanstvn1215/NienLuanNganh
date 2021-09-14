const Controller = require('../../core/controller')
class CardController extends Controller {
    constructor() {
        super()
    }
    getIndex = async (req, res) => {
        res.render('shop/card', {})
    }
}
module.exports = new CardController()
