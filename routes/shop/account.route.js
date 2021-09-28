const Router = require('express').Router()
const AccountControllser = require('../../controllers/shop/account.controller')

Router.get('', AccountControllser.getIndex)
Router.get('/asd', AccountControllser.getIndex)
module.exports = Router
