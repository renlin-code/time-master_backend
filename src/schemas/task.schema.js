const Joi = require("joi").extend(require('@joi/date'));

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const date = Joi.date().format('YYYY-MM-DD').utc();
const done = Joi.boolean();
const important = Joi.boolean();
const categoryId = Joi.number().integer();

const createTaskSchema = Joi.object({
   name: name.required(),
   date: date.required(),
   done: done.required(),
   important: important.required(),
   categoryId: categoryId.required()
});

const updateTaskSchema = Joi.object({
  id,
  name,
  date,
  done,
  important,
  categoryId
});

const getTaskSchema = Joi.object({
  id: id.required()
});

module.exports = { createTaskSchema, updateTaskSchema, getTaskSchema }
