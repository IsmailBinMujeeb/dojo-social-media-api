export default class ApiError extends Error {

    constructor(statusCode, message, errors = [], stack) {
        super(message);

        this.statusCode = statusCode;
        this.message = message;
        this.data = null;
        this.errors = errors;
        this.stack = stack;
        this.success = false;
    }
}