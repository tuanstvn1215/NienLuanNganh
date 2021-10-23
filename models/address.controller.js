const mongoose = require('../core/model.js')
const Schema = new mongoose.Schema({
    deatail: { type: String, required: true },
})
const AddressModel = mongoose.model('Address', Schema, 'addresses')
module.exports = AddressModel
