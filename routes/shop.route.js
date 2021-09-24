const Router = require('express').Router()

const indexRouter = require('./shop/index.route')
const cartRouter = require('./shop/cart.route')
const loginRouter = require('./shop/login.route')

Router.use('/', indexRouter)
Router.use('/cart', cartRouter)
Router.use('/login', loginRouter)
module.exports = Router
