const express = require('express');
const mongoose = require('mongoose');
const route = require('./src/routes/route')
const app = express()

app.use(express.json())

app.use("/",route)
mongoose.connect('mongodb+srv://avenger:rajatrajat12@cluster0.wuyw0.mongodb.net/quickly_platforms');

const port = 4000

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})