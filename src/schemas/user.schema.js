const Joi = require("joi").extend(require('@joi/date'));

const id = Joi.number().integer();
const date = Joi.date().format('YYYY-MM-DD').utc();
const name = Joi.string().min(3).max(15);
const email = Joi.string().email();
const password = Joi.string().min(4).max(8);

const createUserSchema = Joi.object({
   name: name.required(),
   email: email.required(),
   password: password.required()
});

const updateUserSchema = Joi.object({
  id,
  name,
  email,
  password
});

const getUserSchema = Joi.object({
  id: id.required()
});


module.exports = { createUserSchema, updateUserSchema, getUserSchema }
