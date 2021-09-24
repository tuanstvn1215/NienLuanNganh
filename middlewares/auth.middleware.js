const AccountModel = require('../models/account.model')
const UserModel = require('../models/user.model')
module.exports.auth = async (req, res, next) => {
    // kiểm tra có signed Cookies hay không
    //nếu không có signed Cookies thì trả về thông báo đăng nhập và code
    if (!req.signedCookies._id) {
        res.json({ code: 403, message: 'vui lòng đăng nhập' })
        return
    }
    // nếu có signed Cookies thì tìm thông tin người dùng và trả về dữ liệu thông tin người dùng
    else {
        try {
            user = {
                account: await AccountModel.findById(req.signedCookies._id),
                infor: await UserModel.findOne({
                    account: req.signedCookies._id,
                }),
            }
            res.locals.user = user
        } catch {
            res.json({ code: 403, message: 'Lỗi lấy dữ liệu' })
            return
        }
        next()
        return
    }
}
