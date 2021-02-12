const Joi = require("@hapi/joi");

module.exports.signupValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(6).max(255).required(),
        email: Joi.string().min(6).max(255).required().required().email(),
        password: Joi.string().min(6).max(1024).required(),
    });
    return schema.validate(data);
};