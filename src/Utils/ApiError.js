class ApiError extends Error {

    constructor(
        statusCode,
        message="Something went worng",
        error = [],
        stack = ""
    ){
        super(message);
        this.statusCode = statusCode
        this.error = error
        this.message = message
        this.success = false
        this.data = null

        if (stack) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export default ApiError;