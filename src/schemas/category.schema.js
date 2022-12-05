const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const color = Joi.string().max(7);
const userId = Joi.number().integer();

const createCategorySchema = Joi.object({
  name: name.required(),
  color: color.required(),
  userId: userId.required()
    
});

const updateCategorySchema = Joi.object({
  id,
  name,
  color,
  userId
});

const getCategorySchema = Joi.object({
  id: id.required()
});


module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema }
