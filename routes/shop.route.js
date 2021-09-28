const Router = require('express').Router()
const Auth = require('../middlewares/auth.middleware')

const indexRouter = require('./shop/index.route')
const cartRouter = require('./shop/cart.route')
const accountRouter = require('./shop/account.route')
const loginRouter = require('./shop/login.route')
Router.use(Auth.auth)

Router.use('/', indexRouter)
Router.use('/cart', cartRouter)
Router.use('/login', Auth.redirectWhenAuth, loginRouter)
Router.use('/account', accountRouter)
module.exports = Router
