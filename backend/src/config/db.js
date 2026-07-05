const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        console.log("data base is connected"); 
    }catch (error) {
        console.error(`error connecting to  mengoDB: ${error.message}`)
    }
}

module.exports = connectDB;