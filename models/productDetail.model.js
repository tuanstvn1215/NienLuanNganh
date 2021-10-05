const mongoose = require('../core/model.js')
const Schema = new mongoose.Schema({
    name: { type: String, required: true },
    Manufacture: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'ProductManufacture',
    },
    Category: { type: mongoose.SchemaTypes.ObjectId, ref: 'ProductCategory' },
})
const ProductDetailModel = mongoose.model(
    'ProductDetail',
    Schema,
    'productDetails'
)
module.exports = ProductDetailModel
