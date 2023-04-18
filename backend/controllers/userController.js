const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const User = require('../model/userModel')
const sendToken = require("../utils/jwtToken")
// USER REGISTRATION
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const { name, email, password } = req.body

    const user = await User.create({
        name, email, password,

        avatar: {

            public_id: "this is a sample id",
            url: "user profile url"

        }
    })
    sendToken(user,201,res);
});

//LOGIN USER

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter your email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 400));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 400));
    }

    sendToken(user,200,res);


});


//LOGOUT USER

exports.logout = catchAsyncErrors(async(req,res,next)=>{

res.cookie('token',null,{
    expires:new Date (Date.now),
    httpOnly:true
})

    res.status(200).json({
        success:true,
        message:'logged out'
    })
})
