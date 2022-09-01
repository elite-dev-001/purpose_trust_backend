const userSchema = require('../models/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2


const JWT_SECRET = 'jdfuqgwefouh@#$%jknskdjhu%$^jasbdjqd376@!%sdlfj';

//REGISTERING NEW USERS

const createUser = async (req, res) => {

    cloudinary.config({
        cloud_name: "purpose-trust",
        api_key: "122684541261347",
        api_secret: "4_kry7z7U9C4BVTMw19huPsVFkg"
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
                    principalAmount: req.body.principalAmount,
                    transactionHistory: req.body.transactionHistory,
                    depositPending: req.body.depositPending,
                    withdrawPending: req.body.withdrawPending,
                    akawoEligible: false,
                    businessEligible: false,
                    onLoan: false,
                    pendingLoan: false,
                    loanDetails: [],
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
    
            userSchema.find({_id: req.params.id}, (err, result) => {
                if(err) {
                    console.log(err);
                    res.status(500).json({message: err})
                } else {
                    res.status(200).json(result)
                }
            })
        
    }

// GET ALL USERS

const getAllUsers = (req, res) => {
            userSchema.find({}, (err, results) => {
                if(err) {
                    console.log(err);
                    res.status(500).json({message: err})
                } else {
                    res.status(200).json({results})
                }
            })
}

//UPDATE TRANSACTION HISTORY

const updateTransHistory = async (req, res) => {
    const user = await userSchema.findById({_id: req.params.id});
    console.log( user['transactionHistory']);
    const history = Array.from(user['transactionHistory'])
    history.push(req.body.transactionHistory)
    console.log(history);
    const transHistory = await userSchema.findByIdAndUpdate(
        {_id: req.params.id}, {
            $set: {
                transactionHistory: history
            }
        }, {new: true}
    )
    
    if(transHistory) {
        res.status(200).json({message: "Successfully updated"})
    } else {
        res.status(500).json({message: "Could not update"})
    }
}

//UPDATE BALANCE
const updateBalance = async (req, res) => {
    const user = await userSchema.findById({_id: req.params.id})
    const balance = parseFloat(user['balance'])
    const amount = parseFloat(req.body.amount)
    let mainBalance;
    if(req.body.operation === 'deposit') {
        mainBalance = balance + amount
    }
    if(req.body.operation === 'withdraw') {
        mainBalance = balance - amount
    }
    const balanceUpdate = await userSchema.findByIdAndUpdate(
        {_id: req.params.id}, {
            $set: {
                balance: mainBalance
            }
        }, {new: true}
    );
    if(balanceUpdate) {
        res.status(200).json({message: 'Successfully Updated'})
    } else {
        res.status(500).json({message: 'Could not Update'})
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
// UPDATE WITHDRAW PENDING STATUS

const updateCardPayment = async (req, res) => {
    const cardStatus = await userSchema.findByIdAndUpdate(
        {_id: req.params.id}, {
            $set: {
                cardPayment: req.body.cardPayment
            }
        }, {new: true}
    )
    if(cardStatus) {
        res.status(200).json({message: "Successfully updated"})
    } else {
        res.status(500).json({message: "Could not update"})
    }
}
// UPDATE WITHDRAW PENDING STATUS

const updatePrincipalAmount = async (req, res) => {
    const principalAmountStatus = await userSchema.findByIdAndUpdate(
        {_id: req.params.id}, {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneNumber,
                picture: req.body.picture,
                principalAmount: req.body.principalAmount,
            }
        }, {new: true}
    )
    if(principalAmountStatus) {
        res.status(200).json({message: "Successfully updated"})
    } else {
        res.status(500).json({message: "Could not update"})
    }
}

const pendingLoan = async (req, res) => {
    const loanData = [{
        "loanType": req.body.loanType,
        "loanAmount": req.body.loanAmount,
        "loanDate": new Date().toDateString()
    }];
    const updateLoan = await userSchema.findByIdAndUpdate(
        {_id: req.params.id}, {
            $set: {
                pendingLoan: req.body.pendingLoan,
                loanDetails: loanData
            }
        }, {new: true}
    )
    if(updateLoan) {
        res.status(200).json({message: 'Successfully Updated'})
    } else {
        res.status(500).json({message: 'Could not Update'})
    }
}


module.exports = { createUser, getOneUser, getAllUsers, updateTransHistory, updateDepositPendingStatus, updateWithdrawPendingStatus, updateBalance, updateCardPayment, updatePrincipalAmount, pendingLoan}