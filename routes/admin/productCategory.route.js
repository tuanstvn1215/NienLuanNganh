const Router = require('express').Router()
const productCategoryController = require('../../controllers/admin/productCategory.controller')

Router.get('/delete', productCategoryController.delete)
Router.post('/create', productCategoryController.store)
module.exports = Router
