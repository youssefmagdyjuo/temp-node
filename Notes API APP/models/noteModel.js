const mongoose = require('mongoose')

const noseShcema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const note = mongoose.model('Note',noseShcema)
module.exports = note