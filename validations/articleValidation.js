import Joi from "joi";

const createArticleSchema = Joi.object({
    title: Joi.string().min(3).max(255).required().messages({
        'string.empty': 'Title is required.',
        'string.min': 'Title should be at least 3 characters long.'
    }),
    category_id: Joi.string().required().messages({
        "string.empty" : "please select a category"
    }),
    excerpt: Joi.string().allow('').optional(),
    content: Joi.string().required(),
    user_id: Joi.number().required().messages({
    "any.required": "Please select an author",
    "number.base": "Please select a valid author"
}),
    readTime: Joi.number().min(1).required().messages({
    "any.required": "Please select read time",
    "number.base": "Please select a valid read time"
}),
    tags: Joi.string().max(255).allow('').optional(),
});



const updateArticleSchema = Joi.object({
    title: Joi.string().min(3).max(255).messages({
        'string.empty': 'Title is required.',
        'string.min': 'Title should be at least 3 characters long.'
    }),
    category_id: Joi.string().messages({
        "string.empty" : "please select a category"
    }),
    user_id: Joi.number().required().messages({
    "any.required": "Please select an author",
    "number.base": "Please select a valid author"
}),
    excerpt: Joi.string().allow('').optional(),
    content: Joi.string(),
    readTime: Joi.number().min(1).messages({
    "any.required": "Please select read time",
    "number.base": "Please select a valid read time",
    "number.min" : "read time must be at least 1 minute"
}),
    tags: Joi.string().max(255).allow('').optional(),
}).min(1)

export { createArticleSchema, updateArticleSchema };