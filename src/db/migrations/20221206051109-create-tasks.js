'use strict';

const { TASK_TABLE,  TaskSchema } = require("./../models/task.model");
module.exports = {
  up: async(queryInterface) => {
    await queryInterface.createTable(TASK_TABLE, TaskSchema);
  },

  down: async(queryInterface) => {
    await queryInterface.dropTable(TASK_TABLE);
  }
};