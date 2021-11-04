const Controller = require('../../core/controller')

const UserModel = require('../../models/user.model')
class AccountController extends Controller {
    constructor() {
        super()
    }

    getIndex = async (req, res) => {
        let user = res.locals.user
        console.log(res.locals.user)
        res.render('shop/account', { user: user })
    }
    update = async (req, res) => {
        console.log(req.query.id)
        console.log(req.body)
        let name = req.body.name
        let email = req.body.email
        let number = req.body.number
        let address = req.body.address

        await UserModel.findByIdAndUpdate(req.query.id, {
            $set: {
                name: name,
                email: email,
                number: number,
                address: address,
            },
        })
        res.redirect('/account')
    }
}
module.exports = new AccountController()
