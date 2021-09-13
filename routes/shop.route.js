const Router = require('express').Router()

const indexRouter = require('./shop/index.route')

Router.use('/', indexRouter)

module.exports = Router
