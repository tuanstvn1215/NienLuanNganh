const mongoose = require('../core/model.js')
const Schema = new mongoose.Schema({
    name: { type: String, required: true },
    provider: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'ProductProvider',
    },
    category: { type: mongoose.SchemaTypes.ObjectId, ref: 'ProductCategory' },
    price: { type: Number, required: true },
    status: { type: Number, required: true },
    img: {
        type: [String],
        require: true,
    },
})
const ProductModel = mongoose.model('Product', Schema, 'products')
module.exports = ProductModel
