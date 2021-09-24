const mongoose = require('../core/model.js')
const Schema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    create_at: { type: Date, default: Date.now() },
    password: { type: String, required: true },
})
const AccountModel = mongoose.model('Account', Schema, 'accounts')
module.exports = AccountModel
AccountModel.find()
