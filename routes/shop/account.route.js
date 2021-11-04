const Router = require('express').Router()
const AccountControllser = require('../../controllers/shop/account.controller')

Router.get('', AccountControllser.getIndex)
Router.post('/update', AccountControllser.update)
module.exports = Router
