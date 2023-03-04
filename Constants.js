const CONSTANTS = {
    ERROR: {
        ERROR_CODE: 400,
        SERVER_ERROR_CODE: 400,
        ERROR_MESSAGE: 'Opps Something went wrong....!',
    },
    LOGIN_MESSAGES: {
        EMAIL_NOT_FOUND: 'Email is not found in our database',
        EMAIL_PASSWORD_MISMATCH: 'Email and password not match',
        LOGIN_SUCCESS: 'Login successfully'
    },
    RESET_PASSWORD: {
        EMAIL_NOT_FOUND: 'Email is not found in our database',
        LINK_SEND_SUCCESSFULLY: 'Password reset link send successfully',
        LINK_VERIFIED_SUCCESSFULLY: 'Link verified successfully',
        UPDATE_PASSWORD_SUCCESSFULLY: 'Password update successfully',
        LINK_EXPIRED: 'Password reset link expired'
    },
    USER: {
        EMAIL_ALREADY_EXIST: 'Email already exist',
        USER_CREATE_SUCCESSFULLY: 'User created successfully',
        USER_NOT_EXIST: 'User not exist',
        USER_UPDATE: 'User update successfully',
        USER_ACTIVE: 'User active successfully',
        USER_INACTIVE: 'User in active successfully',
        INVALID_AUTHENTICATION: 'Please authenticate using a valid token'
    },
}
module.exports = CONSTANTS;