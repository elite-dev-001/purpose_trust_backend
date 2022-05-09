const agentSchema = require('../models/agent')
// const userSchema = require('../models/user')
// const superAdminSchema = require('../models/super_admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'jdfuqgwefouh@#$%jknskdjhu%$^jasbdjqd376@!%sdlfj';


//REGISTERING NEW AGENT

const createAgent = async (req, res) => {

    
    const { phoneNumber } = req.body;  //get admin email

    const agentNumber = await agentSchema.findOne({ phoneNumber }).lean(); // check if email is already existing in Admin category
    // const userEmail = await userSchema.findOne({ email }).lean();
    // const superAdminEmail = await superAdminSchema.findOne({ email }).lean();

    if(agentNumber) {
        //User with email existing
        return res.json({status: 'error', error: 'Agent already existing'})
    } else {
        const password = await bcrypt.hash(req.body.password, 10) //hash password
        const agent = new agentSchema({
            firstName: req.body.firstName,
            lastName: req.body.lastName, 
            phoneNumber: req.body.phoneNumber,
            gender: req.body.gender,
            guarantors: req.body.guarantors,
            loginPin: req.body.loginPin,
            password: password,
            confirmPassword: password
        }) // Create a new ADMIN from inputted data

        agent.save().then(() => {
            console.log('Agent Created')
            res.status(200).json({message: 'Agent created', status: 'ok'}) // add new user to the database
        }).catch((err) => {
            res.status(500).json({message: err})
        })
    }
}

// GET ALL AGENTS

const getAllAgent = (req, res) => {
    jwt.verify(req.token, JWT_SECRET, function(err, data) {
        if(err) {
            res.status(403)
        } else {
            agentSchema.find({}, (err, results) => {
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


// GET CURRENT AGENT

const getOneAgent = (req, res) => {
    jwt.verify(req.token, JWT_SECRET, function(err, data) {
        if(err) {
            res.status(403)
        } else {
            agentSchema.find({_id: req.params.id}, (err, result) => {
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

//UPDATE AGENT CUSTOMERS

const agentCustomers = async (req, res) => {
    const customers = await agentSchema.findByIdAndUpdate(
        {_id: req.params.id}, {
            $set: {
                customers: req.body.customers
            }
        }, {new: true}
    )
    if(customers) {
        res.status(200).json({message: "Successfully Updated"})
    } else {
        res.status(500).json({message: "Could not update"})
    }
}


//UPDATE AGENT LOGIN PIN

const agentLoginPin = async (req, res) => {
    const loginPin = await agentSchema.findByIdAndUpdate(
        {_id: req.params.id}, {
            $set: {
                loginPin: req.body.loginPin
            }
        }, {new: true}
    )
    if(loginPin) {
        res.status(200).json({message: "Successfully Updated"})
    } else {
        res.status(500).json({message: "Could not update"})
    }
}

//UPDATE AGENT HISTORY

const agentHistory = async (req, res) => {
    const history = await agentSchema.findByIdAndUpdate(
        {_id: req.params.id}, {
            $set: {
                history: req.body.history
            }
        }, {new: true}
    )
    if(history) {
        res.status(200).json({message: "Successfully Updated"})
    } else {
        res.status(500).json({message: "Could not update"})
    }
}

module.exports = { createAgent, getOneAgent, getAllAgent, agentCustomers, agentLoginPin, agentHistory}