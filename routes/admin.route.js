const indexRouter = require('./admin/index.route')
const Router = require('express').Router()
Router.use('/', indexRouter)
Router.use('/productCategory', productCategoryRouter)
