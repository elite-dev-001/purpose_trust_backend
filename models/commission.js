const mongoose = require('mongoose')

const CommissionSchema = new mongoose.Schema({
    amount: {
        type: String,
        required: true
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

module.exports = mongoose.model('Commission', CommissionSchema)