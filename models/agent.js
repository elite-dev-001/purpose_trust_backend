const mongoose = require('mongoose');

const AgentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    guarantors: {
        type: Array,
        required: true
    },
    customers: {
        type: Array,
        required: false
    }, 
    loginPin: {
        type: String,
        required: false
    },
    history: {
        type: Array,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('agent', AgentSchema);