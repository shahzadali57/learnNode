class ErrorHandler extends Error{

    constructor(message,statusCode){                        //the constructor function is a constructor for the ErrorHandler class
        super(message);                                    // The message argument is a string that represents the error message  
        this.statusCode = statusCode                      //  the statusCode argument is a number that represents the status code for the error.

        Error.captureStackTrace(this,this.constructor)      // the Error.captureStackTrace function to capture a stack trace for the error and associate it with the ErrorHandler object.
    }
}

module.exports = ErrorHandler;