const adminSchema = require('../models/admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'jdfuqgwefouh@#$%jknskdjhu%$^jasbdjqd376@!%sdlfj';
//REGISTERING NEW ADMINS

const createAdmin = async (req, res) => {

    
    const { phoneNumber } = req.body;  //get admin Phone Number

    const adminNumber = await adminSchema.findOne({ phoneNumber }).lean(); // check if email is already existing in Admin category

    if(adminNumber) {
        //User with email existing
        return res.json({status: 'error', error: 'Number already existing'})
    } else {
        const password = await bcrypt.hash(req.body.password, 10) //hash password
        const admin = new adminSchema({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            gender: req.body.gender,
            history: req.body.history,
            password: password,
            confirmPassword: password
        }) // Create a new ADMIN from inputted data

        admin.save().then(() => {
            console.log('Admin Created')
            res.status(200).json({message: 'Admin created', status: 'ok'}) // add new user to the database
        }).catch((err) => {
            res.status(500).json({message: err})
        })
    }
}

// GET CURRENT ADMIN
const getOneAdmin = (req, res) => {
    jwt.verify(req.token, JWT_SECRET, function(err, data) {
        if(err) {
            res.status(403)
        } else {
            adminSchema.find({_id: req.params.id}, (err, result) => {
                if(err) {
                    console.log(err);
                    res.status(500).json({message: err})
                } else {
                    res.status(200).json(result)
                }
            })
        }
    })
}

// UPDATE ADMIN APPROVED REQUESTS
const approvedRequest = async (req, res) => {
    const approved = await adminSchema.findByIdAndUpdate(
        {_id: req.params.id}, {
            $set: {
                history: req.body.history
            }
        }, {new: true}
    )
    if(approved) {
        res.status(200).json({message: "Successfully updated"})
    } else {
        res.status(500).json({message: "Could not update"})
    }
}


module.exports = {createAdmin, getOneAdmin, approvedRequest}