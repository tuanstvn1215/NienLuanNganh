const Router = require('express').Router()
const productRouter = require('./admin/product.route')
const productCategoryRouter = require('./admin/productCategory.route')
const productProviderRouter = require('./admin/productProvider.route')
const indexRouter = require('./admin/index.route')
const userRouter = require('./admin/user.route')
Router.use('/', indexRouter)
Router.use('/user', userRouter)
Router.use('/product', productRouter)
Router.use('/productCategory', productCategoryRouter)
Router.use('/productProvider', productProviderRouter)

module.exports = Router
