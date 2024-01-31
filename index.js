require('dotenv').config()

const express = require('express')

const cors = require('cors')

const router = require('./Routers/router')

require('./DB/connections')



//create server
const campuspilotServer = express()

campuspilotServer.use(cors())

campuspilotServer.use(express.json())



campuspilotServer.use(router)

campuspilotServer.use('/uploads',express.static('./uploads'))

const PORT = 4000 || process.env

campuspilotServer.listen(PORT,()=>{
    console.log(`SERVER RUNNING SUCCESSFULLY AT PORT NUMBER ${PORT}`);
})

campuspilotServer.get('/',(req,res)=>{
    res.send(`<h1 style='color:blue'>Campus Pilot Server running Successfuly and Ready to accept requests from Client</h1>`)
})

