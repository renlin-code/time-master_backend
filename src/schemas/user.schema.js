const Joi = require("joi").extend(require('@joi/date'));

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const email = Joi.string().email();
const password = Joi.string().min(4).max(8);
const token = Joi.string();

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

const loginUserSchema = Joi.object({
  email: email.required(),
  password: password.required()
})
const recoveryUserSchema = Joi.object({
  token: token.required(),
  newPassword: password.required()
})

module.exports = { createUserSchema, updateUserSchema, getUserSchema, loginUserSchema, recoveryUserSchema }
