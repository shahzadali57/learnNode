const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require("../middleware/catchAsyncErrors")

const User = require('../model/userModel')

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

const token  = user.getJWTToken();

    res.status(201).json({
        success:true,
        token,
    })
});

//LOGIN USER

exports.loginUser = catchAsyncErrors(async (req,res,next)=>{
    const {email, password} = req.body;

  if(!email || !password){
return next(new ErrorHandler("please enter your email and password",400))
  } 

  const user = User.find()

})