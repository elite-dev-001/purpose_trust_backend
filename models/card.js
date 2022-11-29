const mongoose = require('mongoose')


const CardSchema = new mongoose.Schema({
    amount: {
        type: String,
        required: false
    },
    customerId: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    cardNumber: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Card', CardSchema)