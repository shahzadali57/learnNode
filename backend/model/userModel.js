const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

// Hashing password
userSchema.pre("save", async function(next){
if(!this.isModified){
    next()
}

this.password = await bcrypt.hash(this.password, 10)
})

// Generating json web token
userSchema.methods.getJWTToken = function(){
return jwt.sign(
    {id:this._id},
    process.env.JWT_SECRET,
    {
        expiresIn:process.env.JWT_EXPIRE
    }
    )
}



module.exports = mongoose.model("user", userSchema)