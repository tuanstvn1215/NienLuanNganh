const Router = require('express').Router()
const productController = require('../../controllers/shop/product.controller')
const Auth = require('../../middlewares/auth.middleware')
Router.get('', productController.index)
Router.get('/show', productController.show)
Router.get('/findOne', productController.findOne)
Router.post('/rate', Auth.requireAuth, productController.rate)
Router.get('/stars', productController.getStars)
module.exports = Router
