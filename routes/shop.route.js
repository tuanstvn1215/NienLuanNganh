const Router = require('express').Router()
const Auth = require('../middlewares/auth.middleware')
const ErrorController = require('../controllers/shop/error.controller')
const indexRouter = require('./shop/index.route')
const cartRouter = require('./shop/cart.route')
const accountRouter = require('./shop/account.route')
const loginRouter = require('./shop/login.route')
const productRouter = require('./shop/product.route')
Router.get('/error/:id', ErrorController.getError)
Router.use(Auth.auth)

Router.use('/', indexRouter)
Router.use('/cart', cartRouter)
Router.use('/login', Auth.redirectWhenAuth, loginRouter)
Router.use('/account', accountRouter)
Router.use('/product', productRouter)
module.exports = Router
