const mongoose = require('../core/model.js')
const Schema = new mongoose.Schema({
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    product: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product',
        required: true,
    },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
})
const CommentModel = mongoose.model('Comment', Schema, 'comments')
module.exports = CommentModel
