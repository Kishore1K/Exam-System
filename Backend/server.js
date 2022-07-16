const express = require('express')


const app = express()
// const mysql = require('mysql')
const port = 5000
const cors = require('cors')
// const router = express.Router()
// const req = require('express/lib/request')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
app.use(cors())
app.use(express.json())

app.use('/student', require('./routes/student'));
app.use('/faculty', require('./routes/faculty'));



app.listen(port, ()=>{
    console.log(`yey Your server is running in port ${port}`)
})
