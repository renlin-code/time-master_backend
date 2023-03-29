const Joi = require("joi").extend(require('@joi/date'));

const id = Joi.number().integer();
const name = Joi.string().max(30);
const date = Joi.date().format('YYYY-MM-DD').utc();
const from = Joi.date().format('YYYY-MM-DD').utc();
const to = Joi.date().format('YYYY-MM-DD').utc();
const done = Joi.boolean();
const important = Joi.boolean();
const categoryId = Joi.number().integer();
const searchQuery = Joi.string();

const createTaskSchema = Joi.object({
  name: name.required(),
  date: date.required(),
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

const queryTaskDateSchema = Joi.object({
  date,
  from,
  to
});

const searchTaskSchema = Joi.object({
  searchQuery
});

module.exports = { createTaskSchema, updateTaskSchema, getTaskSchema, queryTaskDateSchema, searchTaskSchema }
