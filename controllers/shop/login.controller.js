const Controller = require('../../core/controller')
const AccountModel = require('../../models/account.model')
const bcrypt = require('bcryptjs')
const UserModel = require('../../models/user.model')
class LoginController extends Controller {
    constructor() {
        super()
    }
    getLogin = async (req, res) => {
        res.render('shop/login', { login: true })
    }
    Login = async (req, res) => {
        let username = req.body.username
        let password = req.body.password
        console.log(req.body)
        // kiểm tra tài khoản chỉ gồm kí tự và số
        let pattern = /\w+/
        if (username.match(pattern) != username) {
            res.json({
                code: 4,
                message: 'Tài khoản chỉ bao gồm kí tự và số',
            })
            return
        }
        //lấy dữ liệu từ database
        let userFormdb = await AccountModel.findOne({ username: username })
        //kiểm tra tài khoản có tồn tại  trên database không
        if (!userFormdb) {
            res.json({ code: 1, message: 'tài khoản không tồn tại' })
            return
        }
        //kiểm tra mật khẩu có đúng không
        let flag = await bcrypt.compare(password, userFormdb.password)
        if (!flag) {
            res.json({ code: 2, message: 'Sai mật khẩu' })
            return
        }
        //set cookie bằng _id cho người dùng nếu đúng thông tin
        res.cookie('_id', userFormdb._id, {
            signed: true,
        })
        res.json({ code: 200, message: 'Đăng nhập thành công' })
    }
    getRegister = async (req, res) => {
        res.render('shop/login', { login: false })
    }
    register = async (req, res) => {
        let username = req.body.username
        let password = req.body.password
        let rppassword = req.body.rppassword
        if (rppassword != password) {
            res.json({
                code: 403,
                message: 'Nhập lại mật khẩu phải trùng với mật khẩu',
            })
            return
        }
        console.log(req.body)
        //lấy dữ liệu từ database
        let userFormdb = await AccountModel.findOne({ username: username })
        if (userFormdb) {
            res.json({ code: 403, message: 'Tài khoản đã tồn tại' })
            return
        }
        let patt = /\w+/
        if (username.match(patt) != username) {
            res.json({
                code: 403,
                message: 'Tài khoản chỉ bao gồm kí tự và số',
            })
            return
        }
        var salt = await bcrypt.genSalt(10)
        password = await bcrypt.hash(req.body.password, salt)
        try {
            let account = new AccountModel({
                username: username,
                password: password,
            })
            await account.save()
            let user = new UserModel({
                account: account.id,
                role: '2',
                modify_at: Date.now(),
            })
            await user.save()
            res.cookie('_id', account.id, {
                signed: true,
            })
        } catch (err) {
            console.log(err)
        }
        res.json({ code: 200, message: 'Đăng kí thành công' })
    }
}
module.exports = new LoginController()
