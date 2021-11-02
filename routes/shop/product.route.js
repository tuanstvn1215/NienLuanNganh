const Router = require('express').Router()
const productController = require('../../controllers/shop/product.controller')

Router.get('', productController.show)

module.exports = Router
