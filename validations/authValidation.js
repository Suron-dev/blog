import Joi from "joi";

const registerUserSchema = Joi.object({
    name: Joi.string().min(3).max(255).required().messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters long",
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Invalid email format",
    }),
    username: Joi.string().min(4).max(255).required().messages({
        "string.empty": "Username is required",
        "string.min": "Username must be at least 4 characters long",
    }),
    password: Joi.string().min(6).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters long",
    }),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
        "any.only": "Passwords do not match",
        "string.empty": "Confirm password is required",
    }),
});

export default registerUserSchema;
