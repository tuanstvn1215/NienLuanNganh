const Router = require('express').Router()
const productController = require('../../controllers/shop/product.controller')

Router.get('', productController.index)
Router.get('/show', productController.show)
module.exports = Router
