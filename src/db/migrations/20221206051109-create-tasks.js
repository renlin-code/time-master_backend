'use strict';

const { TASK_TABLE } = require("./../models/task.model");
module.exports = {
  up: async(queryInterface) => {
    await queryInterface.createTable(TASK_TABLE, {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
      },
      name: {
          type: DataTypes.STRING,
          allowNull: false
      },
      date: {
          type: DataTypes.DATEONLY,
          allowNull: false
      },
      done: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
      },
      important: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
      },
      categoryId: {
          field: "category_id",
          allowNull: false,
          type: DataTypes.INTEGER,
          refereces: {
              model: CATEGORY_TABLE,
              key: "id"
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL"
      }
    });
  },

  down: async(queryInterface) => {
    await queryInterface.dropTable(TASK_TABLE);
  }
};