const Router = require('express').Router()
const productRouter = require('./admin/product.route')
const productCategoryRouter = require('./admin/productCategory.route')

Router.use('/product', productRouter)
Router.use('/productCategory', productCategoryRouter)
module.exports = Router
