const Router = require('express').Router()

const indexRouter = require('./shop/index.route')
const cartRouter = require('./shop/cart.route')

Router.use('/', indexRouter)
Router.use('/cart', cartRouter)
module.exports = Router
