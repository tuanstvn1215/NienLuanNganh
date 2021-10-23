const mongoose = require('../core/model.js')
const Schema = new mongoose.Schema({
    product: { type: String, required: true },
    promotion:{}
})
const AccountModel = mongoose.model('Account', Schema, 'accounts')
module.exports = AccountModel
