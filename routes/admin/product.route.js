const Router = require('express').Router()
const productController = require('../../controllers/admin/product.controller')

Router.get('', productController.show)
Router.get('/create', productController.create)
module.exports = Router
