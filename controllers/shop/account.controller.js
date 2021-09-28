const Controller = require('../../core/controller')

const UserModel = require('../../models/user.model')
class AccountController extends Controller {
    constructor() {
        super()
    }

    getIndex = async (req, res) => {
        let user = res.locals.user

        res.render('shop/account', { user: user })
    }
}
module.exports = new AccountController()
