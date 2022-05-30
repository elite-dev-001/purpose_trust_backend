const mongoose = require('mongoose')

const SavingSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: false
    },
    amount: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('savings', SavingSchema)