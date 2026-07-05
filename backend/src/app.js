const express = require('express');
const connectDB = require('./config/db.js');
const cors = require("cors");
const { errorHandler } = require('./middleware/errorHandler.js');
const AppRoute = require('./routes/index.js');
require('dotenv').config();

const app = express()
const PORT = process.env.PORT

connectDB()
app.use(cors())
app.use(express.json())

app.use("/api/v1",AppRoute)     

app.use(errorHandler)


app.listen(PORT, ()=>{
    console.log(`backend server start port ${PORT}`)

})