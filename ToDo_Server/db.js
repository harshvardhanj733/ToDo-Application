const mongoose = require('mongoose');
require('dotenv').config()
const url = process.env.MONGOURL;

const database = module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    try {
        mongoose.connect(url, connectionParams)
        console.log("Database Connected Successfully!")
    } catch (error) {
        console.log(error)
        console.log("Database Connection Failed!")
    }
}