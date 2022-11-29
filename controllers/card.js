const cardSchema = require('../models/card')


const createCard = (req, res) => {
    const card = new cardSchema({
        amount: '200',
        date: new Date().toDateString(),
        customerId: req.body.customerId,
        customerName: req.body.customerName,
        cardNumber: req.body.cardNumber
    })

    card.save().then(() => {
        res.status(200).json({message: 'Card Created', status: 'ok'})
    }).catch((err) => {
        res.status(500).json({message: err})
    })
}

const getAllCards = (req, res) => {
    cardSchema.find({}, (err, results) => {
        if(err) {
            console.log(err)
            res.status(500).json({message: err})
        } else {
            res.status(200).json({results})
        }
    })
}


module.exports = {createCard, getAllCards}