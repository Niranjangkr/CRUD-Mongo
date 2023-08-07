const mongoose = require('mongoose');
const validator = require('validator');

const Users = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw Error("Not a valid Email");
            }
        }
    },
    mobile :{
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    gender: {
        type: String,
        required: true, 
    },
    Status:{ 
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    dateCreated:Date,
    dateUpdated:Date
})

const users = mongoose.model('users', Users);

module.exports = users;