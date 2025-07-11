import Joi from "joi";

const createArticleSchema = Joi.object({
    title: Joi.string().min(3).max(255).required().messages({
        'string.empty': 'Title is required.',
        'string.min': 'Title should be at least 3 characters long.'
    }),
    category_id: Joi.string().required(),
    excerpt: Joi.string().allow('').optional(),
    content: Joi.string().required(),
    user_id: Joi.number(),
    readTime: Joi.number().min(1).required(),
    tags: Joi.string().max(255).allow('').optional(),
});

const updateArticleSchema = Joi.object({
    title: Joi.string().min(3).max(255),
    category_id: Joi.string(),
    user_id: Joi.number().required(),
    excerpt: Joi.string().allow('').optional(),
    content: Joi.string(),
    readTime: Joi.number().min(1),
    tags: Joi.string().max(255).allow('').optional(),
}).min(1)

export { createArticleSchema, updateArticleSchema };