const mongoose = require('../core/model.js')
const Schema = new mongoose.Schema({
    product: { type: String, required: true },
})
const AccountModel = mongoose.model('Account', Schema, 'accounts')
module.exports = AccountModel
