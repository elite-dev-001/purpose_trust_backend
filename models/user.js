const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    stateOfResidence: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    transactionHistory: {
        type: Array,
        required: false
    },
    depositPending:{
        type: Array,
        required: false
    },
    withdrawPending:{
        type: Array,
        required: false
    },
    cardNumber: {
        type: String,
        required: true
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

module.exports = mongoose.model('user', UserSchema);