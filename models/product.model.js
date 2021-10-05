const mongoose = require('../core/model.js')
const Schema = new mongoose.Schema({
    name: { type: String, required: true },
    productDetail: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'ProductDetail',
    },
})
const ProductModel = mongoose.model('Product', Schema, 'products')
module.exports = ProductModel
