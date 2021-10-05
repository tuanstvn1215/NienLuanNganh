const mongoose = require('../core/model.js')
const Schema = new mongoose.Schema({
    name: { type: String, required: true },
})
const ProductManufactureModel = mongoose.model(
    'ProductManufacture',
    Schema,
    'productManufactures'
)
module.exports = ProductManufactureModel
