const commissionSchema = require('../models/commission')



const createCommission = (req, res) => {
    const commission = new commissionSchema({
        amount: req.body.amount,
        date: new Date().toDateString(),
        customerId: req.body.customerId,
        customerName: req.body.customerName,
        cardNumber: req.body.cardNumber,
    })

    commission.save().then(() => {
        res.status(200).json({message: 'Commission Created', status: 'ok'})
    }).catch((err) => {
        res.status(500).json({message: err})
    })
}

const getAllCommissions = (req, res) => {
    commissionSchema.find({}, (err, results) => {
        if(err) {
            console.log(err)
            res.status(500).json({message: err})
        } else {
            res.status(200).json({results})
        }
    })
}

module.exports = { createCommission, getAllCommissions}