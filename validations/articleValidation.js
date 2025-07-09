import Joi from "joi";

const articleSchema = Joi.object({
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

export default articleSchema;