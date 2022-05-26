const userSchema = require('../models/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2


const JWT_SECRET = 'jdfuqgwefouh@#$%jknskdjhu%$^jasbdjqd376@!%sdlfj';

//REGISTERING NEW USERS

const createUser = async (req, res) => {

    cloudinary.config({
        cloud_name: "wilsonchinedu",
        api_key: "147132482297155",
        api_secret: "TuC__zwwBXQ764YO3Y_vXr73p00"
    })

    
    const { phoneNumber } = req.body;  //get user phone number

    const userNumber = await userSchema.findOne({ phoneNumber }).lean(); // check if number is already existing in User category
    // const adminEmail = await adminSchema.findOne({ email }).lean();
    // const superAdminEmail = await superAdminSchema.findOne({ email }).lean();
    

    if(userNumber) {
        //User with phone number existing
        return res.json({status: 'error', error: 'User already existing'})
    } else {
        cloudinary.uploader.upload(req.file['path'], async (error, result) => {
            if(result) {
                const password = await bcrypt.hash(req.body.password, 10) //hash password
                const user = new userSchema({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phoneNumber: req.body.phoneNumber,
                    picture: result['secure_url'],
                    gender: req.body.gender,
                    stateOfResidence: req.body.stateOfResidence,
                    address: req.body.address,
                    cardNumber: req.body.cardNumber,
                    cardPayment: req.body.cardPayment,
                    balance: '0.0',
                    agentId: req.body.agentId,
                    transactionHistory: req.body.transactionHistory,
                    depositPending: req.body.depositPending,
                    withdrawPending: req.body.withdrawPending,
                    password: password,
                    confirmPassword: password
                }) // Create a new user from inputted data

                user.save().then(() => {
                    console.log('User Created')
                    res.status(200).json({message: 'User created', status: 'ok'}) // add new user to the database
                }).catch((err) => {
                    res.status(500).json({message: err})
                })
            } else {
                res.status(500).json({message: error})
            }
        })
    }
} //

// GET CURRENT USER
const getOneUser = (req, res) => {
    jwt.verify(req.token, JWT_SECRET, function(err, data) {
        if(err) {
            res.status(403) 
        } else {
            userSchema.find({_id: req.params.id}, (err, result) => {
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

// GET ALL USERS

const getAllUsers = (req, res) => {
    jwt.verify(req.token, JWT_SECRET, function(err, data) {
        if(err) {
            res.status(403)
        } else {
            userSchema.find({}, (err, results) => {
                if(err) {
                    console.log(err);
                    res.status(500).json({message: err})
                } else {
                    res.status(200).json({results})
                }
            })
        }
    })
}

//UPDATE TRANSACTION HISTORY

const updateTransHistory = async (req, res) => {
    const transHistory = await userSchema.findByIdAndUpdate(
        {_id: req.params.id}, {
            $set: {
                transactionHistory: req.body.transactionHistory
            }
        }, {new: true}
    )
    if(transHistory) {
        res.status(200).json({message: "Successfully updated"})
    } else {
        res.status(500).json({message: "Could not update"})
    }
}

// UPDATE DEPOSIT PENDING STATUS

const updateDepositPendingStatus = async (req, res) => {
    const pendingStatus = await userSchema.findByIdAndUpdate(
        {_id: req.params.id}, {
            $set: {
                depositPending: req.body.depositPending
            }
        }, {new: true}
    )
    if(pendingStatus) {
        res.status(200).json({message: "Successfully updated"})
    } else {
        res.status(500).json({message: "Could not update"})
    }
}

// UPDATE WITHDRAW PENDING STATUS

const updateWithdrawPendingStatus = async (req, res) => {
    const pendingStatus = await userSchema.findByIdAndUpdate(
        {_id: req.params.id}, {
            $set: {
                withdrawPending: req.body.withdrawPending
            }
        }, {new: true}
    )
    if(pendingStatus) {
        res.status(200).json({message: "Successfully updated"})
    } else {
        res.status(500).json({message: "Could not update"})
    }
}

module.exports = { createUser, getOneUser, getAllUsers, updateTransHistory, updateDepositPendingStatus, updateWithdrawPendingStatus}