const Router = require('express').Router()
const cartControllser = require('../../controllers/shop/cart.controller')

Router.get('', cartControllser.getIndex)
Router.post('/checkout', cartControllser.checkout)
Router.get('/success/:billid', cartControllser.success)

module.exports = Router
