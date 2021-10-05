const mongoose = require('../core/model.js')
const Schema = new mongoose.Schema({
    name: { type: String, required: true },
})
const ProductOriginModel = mongoose.model(
    'ProductOrigin',
    Schema,
    'productOrigins'
)
module.exports = ProductOriginModel
