const Joi = require("@hapi/joi");
// validate inputs for signup and login
module.exports.signupValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(255).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required(),
    });
    return schema.validate(data);
};

module.exports.loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required(),
    });
    return schema.validate(data);
};