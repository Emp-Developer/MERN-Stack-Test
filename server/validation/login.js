const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
    let errors = {};

    // Convert empty field to empty string
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // Check Email
    if(Validator.isEmpty(data.email)) {
        errors.email = "Email is required!";
    } else if(!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid!";
    } 

    // Check Password
    if(Validator.isEmpty(data.password)) {
        errors.password = "Passowrd is required!";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};