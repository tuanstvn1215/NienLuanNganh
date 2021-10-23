const mongoose = require('../core/model.js')
const Schema = new mongoose.Schema({
    name: { type: String, required: true },
    manufacture: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'ProductManufacture',
    },
    category: { type: mongoose.SchemaTypes.ObjectId, ref: 'ProductCategory' },
})
const ProductDetailModel = mongoose.model(
    'ProductDetail',
    Schema,
    'productDetails'
)
module.exports = ProductDetailModel
