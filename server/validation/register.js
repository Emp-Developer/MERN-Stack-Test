const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // Convert empty fields to and empty string
    data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
    data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // Check First Name
    if(Validator.isEmpty(data.first_name)) {
        errors.first_name = "First Name is required!";
    }

    // Check Last Name
    if(Validator.isEmpty(data.last_name)) {
        errors.last_name = "Last Name is required!";
    }

    // Check Email
    if(Validator.isEmpty(data.email)) {
        errors.email = "Email is required!";
    } else if(!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid!";
    }

    // Check Password
    if(Validator.isEmpty(data.password)) {
        errors.password = "Password is required!";
    }
    if(!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters!"
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
