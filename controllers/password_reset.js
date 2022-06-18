// const userSchema = require('../models/user');
const adminSchema = require('../models/admin')
const agentSchema = require('../models/agent')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'jdfuqgwefouh@#$%jknskdjhu%$^jasbdjqd376@!%sdlfj';



const resetPassword = async (req, res) => {

    const { newPassword, token, user } = req.body;

    if(user === 'agent') {
    try {
        const agent =  jwt.verify(token, JWT_SECRET)
        const _id = agent.id
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        await agentSchema.updateOne({ _id}, {
            $set: { password: hashedPassword}
        }).then(() => {
            res.json({ status: 'ok', message: "Success"})
        }).catch((err) => {
            res.status(500).json({message: err})
        })
        
    } catch (error) {
        res.json({ status: 'error', error: ';))'})
    }
    } else if( user === 'admin') {
    try {
        const admin =  jwt.verify(token, JWT_SECRET)
        const _id = admin.id
        const password = await bcrypt.hash(newPassword, 10)
        await adminSchema.updateOne({ _id}, {
            $set: { password}
        }).then(() => {
            res.json({ status: 'ok', message: "Success"})
        }).catch((err) => {
            res.status(500).json({message: err})
        })
        
    } catch (error) {
        res.json({ status: 'error', error: ';))'})
    }
    }

    

    
}

module.exports = {resetPassword}