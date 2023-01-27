const mongoose = require('mongoose');
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter your name"],
        maxLength: [30, "name should be less than 30 characters"],
        minLength: [4, "name should be greater than 4 characters"]
    },
    email: {
        type: String,
        required: [true, "please enter your email adress"],
        unique: true,
        validate: [validator.isEmail, "please enter a valid email adress"]               // make sure that email is valid and according to the rules or not
    },

    password: {
        type: String,
        required: [true, "please enter your password"],
        minLength: [8, "password should be greater than 8 characters"],
        select: false                                                     //Will not show your password when call find() method.
    },

    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },

    role:{
        type:String,
        default:"user"
    },

    resetPasswordToken:String,
    resetPasswordExpiry:Date
})


module.exports = mongoose.Model("user", userSchema)