const Router = require('express').Router()
const productRouter = require('./admin/product.route')
const productCategoryRouter = require('./admin/productCategory.route')
// const productCategoryRouter = require('./admin/productProvider.route')

Router.use('/product', productRouter)
Router.use('/productCategory', productCategoryRouter)
// Router.use('/productCategory', productProviderRouter)

module.exports = Router
