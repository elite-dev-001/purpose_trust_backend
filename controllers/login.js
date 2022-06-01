// const userSchema = require('../models/user');
const adminSchema = require('../models/admin')
const agentSchema = require('../models/agent')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'jdfuqgwefouh@#$%jknskdjhu%$^jasbdjqd376@!%sdlfj';



// USER LOGIN

const loginControl = async (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", "*")
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    // res.setHeader("Access-Control-Max-Age", "1800");
    // res.setHeader("Access-Control-Allow-Headers", "content-type");
    // res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );

    const {phoneNumber, password} = req.body;

    // const user = await userSchema.findOne({ email }).lean();
    const admin = await adminSchema.findOne({ phoneNumber }).lean();
    const agent = await agentSchema.findOne({ phoneNumber }).lean();

    if(agent) {
        if(await bcrypt.compare(password, agent.password)) {
            const token = jwt.sign({
                id: agent._id,
                email: agent.email
            },
            JWT_SECRET
            )
            return res.json({ status: "ok", data: token, role: 'agent'})
        } else {
            return res.json({ status: 'error', error: 'Incorrect password'})
        }
    } else if(admin) {
        if(await bcrypt.compare(password, admin.password)) {
            const token = jwt.sign({
                id: admin._id,
                email: admin.email
            },
            JWT_SECRET
            )
            return {
                statusCode: 200,
                 headers: {
              "Access-Control-Allow-Origin": "*", // Required for CORS support to work
              "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
              "Access-Control-Allow-Headers": "Origin,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,locale",
              "Access-Control-Allow-Methods": "POST, OPTIONS"
            },
            body: JSON.stringify(item)
            };
        } else {
            return res.json({ status: 'error', error: 'Incorrect password'})
        }
    }

    res.json({status: 'error', error: 'User does not exist'})
}

module.exports = {loginControl}