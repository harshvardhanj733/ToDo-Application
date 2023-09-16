const mongoose = require('mongoose');

const Schema = mongoose.Schema

const SignupSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"]
    }, 
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
})

const Signup = mongoose.model("Signup", SignupSchema)

module.exports = Signup;