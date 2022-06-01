const express = require('express')
const mongoose = require('mongoose')
const createUserRoute = require('./routes/user')
const agentRoute = require('./routes/agent')
const adminRoute = require('./routes/admin')
const loginRoute = require('./routes/login')
const savingsRoute = require('./routes/savings')
const resetPasswordRoute = require('./routes/password_reset')
const cors = require('cors')



let port = process.env.PORT || 8000;

const app = express();

this.app.use(function (req, res, next) {
    res.header("Access-Control-Alllow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    // res.header("Access-Control-Allow-Private-Network", true)
    if(req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }

    next();
})

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200,
    methods: ["GET", "POST", "PATCH"]
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//API ROUTES FOR USERS
app.use('/api/user/', createUserRoute);

//API ROUTES FOR AGENTS
app.use('/api/agent/', agentRoute);

//API ROUTES FOR ADMINS
app.use('/api/admins/', adminRoute)

//API ROUTE FOR LOGIN
app.use('/api/login', loginRoute)

//API ROUTES FOR PASSWORD RESET
app.use('/api/reset/', resetPasswordRoute)

//API FOR SAVINGS
app.use('/api/savings/', savingsRoute)

//MONGOOSE CONNECT
mongoose.connect(
    'mongodb+srv://purposetrust:vikmU5kcfHpjEx5B@cluster0.s91cn.mongodb.net/PurposeTrust?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    app.listen(port, () => {
        console.log('API running at: http://localhost:5000')
    })
}).catch((err) => {
    console.log(err)
})
//ok let's try again
//vikmU5kcfHpjEx5B

// mongodb+srv://purposetrust:vikmU5kcfHpjEx5B@cluster0.s91cn.mongodb.net/PurposeTrust?retryWrites=true&w=majority