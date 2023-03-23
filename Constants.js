const CONSTANTS = {
    ERROR: {
        ERROR_CODE: 400,
        SERVER_ERROR_CODE: 500,
        NOT_FOUND_ERROR_CODE: 404,
        UNAUTHORIZED_ERROR_CODE: 401,
        ERROR_MESSAGE: 'Opps Something went wrong....!',
        NOT_FOUND_ERROR_MESSAGE: 'Sorry data not found!',
        UNAUTHORIZED_ERROR_MESSAGE: "You are not authorized!",
        USER_EXIST_ERROR_MESSAGE: "User is already exist!",
    },
    SUCCESS: {
        SUCCESS_CODE: 200,
        ADD_SUCCESS_MESSAGE: 'Data added successfully!',
        DELETE_SUCCESS_MESSAGE: 'Data deleted successfully!',
        UPDATE_SUCCESS_MESSAGE: 'Data updated successfully!',
    },
    USER: {
        USER_CREATE_SUCCESSFULLY: 'User created successfully',
    },
    ADMIN: {
        ADMIN_CREATE_SUCCESSFULLY: 'Admin created successfully',
    },
    AUTH: {
        EMAIL_ALREADY_EXIST: 'Email already exist',
        EMAIL_NOT_FOUND: 'Email is not found in our database',
        EMAIL_PASSWORD_MISMATCH: 'Email and password not match',
        INVALID_AUTHENTICATION: 'Please authenticate using a valid token',
        LOGIN_SUCCESS: 'Login successfully',
    },
    FIELD_VALIDATION:{
        NAME_VALIDATION: 'Name must be at least 2 characters',
        EMAIL_VALIDATION: 'Email field is empty or not a valid email',
        PASSWORD_VALIDATION:'Password must be have minimum 8 characters',
        IMAGE_VALIDATION:'Image should not be blank',
        USER_VALIDATION:'User id should not be blank',
        // event 
        EVENT_MODE_VALIDATION:'Mode of event should not be blank',
        EVENT_TYPE_VALIDATION:'Type of event should not be blank',
        // guest
        EVENT_VALIDATION:'event should not be blank',
    }

}
module.exports = CONSTANTS;