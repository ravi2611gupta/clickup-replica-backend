const CONSTANTS = {
    ERROR: {
        ERROR_CODE: 400,
        SERVER_ERROR_CODE: 500,
        NOT_FOUND_ERROR_CODE: 404,
        ERROR_MESSAGE: 'Opps Something went wrong....!',
    },
    USER: {
        EMAIL_ALREADY_EXIST: 'Email already exist',
        USER_CREATE_SUCCESSFULLY: 'User created successfully',
        INVALID_AUTHENTICATION: 'Please authenticate using a valid token',
        EMAIL_NOT_FOUND: 'Email is not found in our database',
        EMAIL_PASSWORD_MISMATCH: 'Email and password not match',
        LOGIN_SUCCESS: 'Login successfully',
        NAME_VALIDATION: 'Name must be at least 2 characters',
        EMAIL_VALIDATION: 'Password must be have minimum 8 characters',
        PASSWORD_VALIDATION:'Email field is empty or not a valid email'
    },

}
module.exports = CONSTANTS;