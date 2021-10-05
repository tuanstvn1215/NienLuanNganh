const mongoose = require('../core/model.js')
const Schema = new mongoose.Schema({
    name: { type: String, required: true },
})
const ProductCategoryModel = mongoose.model(
    'ProductCategory',
    Schema,
    'productCategorys'
)
module.exports = ProductCategoryModel
