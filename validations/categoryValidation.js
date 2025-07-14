import Joi from "joi";

const createCategorySchema = Joi.object({
    name: Joi.string().required().max(20),
});

export {createCategorySchema};