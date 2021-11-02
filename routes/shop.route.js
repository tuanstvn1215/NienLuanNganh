const Router = require('express').Router()
const Auth = require('../middlewares/auth.middleware')
const ErrorController = require('../controllers/shop/error.controller')
const indexRouter = require('./shop/index.route')
const cartRouter = require('./shop/cart.route')
const accountRouter = require('./shop/account.route')
const loginRouter = require('./shop/login.route')

Router.use(Auth.auth)

Router.use('/cart', cartRouter)
Router.use('/', indexRouter)

Router.use('/login', Auth.redirectWhenAuth, loginRouter)
Router.use('/account', accountRouter)
Router.get('/logout', async (req, res) => {
    console.log(res.clearCookie('_id'))
    res.redirect('/')
})
module.exports = Router
