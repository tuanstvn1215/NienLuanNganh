const mongoose = require('../core/model.js')
const Schema = new mongoose.Schema({
    product: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product',
        required: true,
    },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    value: { type: Number },
})
const RateModel = mongoose.model('Rate', Schema, 'rates')
module.exports = RateModel
