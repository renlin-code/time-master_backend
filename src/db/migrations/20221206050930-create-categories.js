'use strict';

const { CATEGORY_TABLE,  CategorySchema } = require("./../models/category.model");
module.exports = {
  up: async(queryInterface) => {
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
  },

  down: async(queryInterface) => {
    await queryInterface.dropTable(CATEGORY_TABLE);
  }
};
