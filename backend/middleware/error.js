const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => { 

    err.statusCode = err.statusCode || 500 

    err.message = err.message || "Internal Server Error"


    //wrong mongoDB ID error
    if(err.name == "cast"){
        const message = `Resource not found. invalid : ${err.path}`
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        err: err.message
    })
}