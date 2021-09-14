const Router = require('express').Router()
const cartControllser = require('../../controllers/shop/cart.controller')

Router.get('', cartControllser.getIndex)
module.exports = Router
