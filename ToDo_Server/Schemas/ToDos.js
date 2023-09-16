const mongoose = require('mongoose');

const Schema = mongoose.Schema

const ToDosSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"]
    }, 
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    status: {
        type: Boolean,
        required: [true, "Status is required"]
    }
})

const ToDos = mongoose.model("ToDos", ToDosSchema);

module.exports = ToDos;