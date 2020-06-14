require('dotenv/config')

const bodyParser=require("body-parser");

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors=require("cors")
//middleware

app.use(cors())
app.use(bodyParser.json())

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection



db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())

const dueListsRoute = require('./routes/DueList.route')
app.use('/dueLists', dueListsRoute)

const txnRoute = require('./routes/Transaction.route')
app.use('/dueLists/txn', txnRoute)

const usersRoute = require('./routes/users.route')
app.use('/user', usersRoute)

app.listen(5000, () => console.log('server started'))

