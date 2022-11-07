const savingSchema = require('../models/savings')

const createSavings = (req, res) => {

    const saving = new savingSchema({
        status: req.body.status,
        time: new Date().toTimeString().slice(0, 9),
        day: new Date().toDateString(),
        amount: req.body.amount,
        userId: req.body.userId,
        operation: req.body.operation,
        agentName: req.body.agentName,
        commission: req.body.commission
    })

    saving.save().then(() => {
        res.status(200).json({message: 'Savings Created', status: 'ok'})
    }).catch((err) => {
        res.status(500).json({message: err})
    })
}

//UPDATE STATUS
const statusUpdate = async (req, res) => {
    const status = await savingSchema.findByIdAndUpdate(
        {_id: req.params.id}, {
            $set: {
                status: req.body.status
            }
        }, {new: true}
    )
    if(status) {
        res.status(200).json({message: "Successfully Updated"})
    } else {
        res.status(500).json({message: "Could not update"})
    }
}

//GET AL SAVINGS

const getAllSavings = (req, res) => {
    savingSchema.find({}, (err, results) => {
        if(err) {
            console.log(err);
            res.status(500).json({message: err})
        } else {
            res.status(200).json({results})
        }
    })
}

const getOneSavings = (req, res) => {
    savingSchema.find({_id: req.params.id}, (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).json({message: err})
        } else {
            res.status(200).json(result)
        }
    })
}

module.exports = { createSavings, statusUpdate, getAllSavings, getOneSavings}