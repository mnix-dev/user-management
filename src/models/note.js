const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: String,
    type: String,
    createdAt: Number,
    lastEdit: Number,
    lastEditBy: String,
    archive: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdBy: String
})

module.exports = mongoose.model("Note", schema)