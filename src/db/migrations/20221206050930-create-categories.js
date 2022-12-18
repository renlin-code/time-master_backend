'use strict';

const { CATEGORY_TABLE } = require("./../models/category.model");
module.exports = {
  up: async(queryInterface) => {
    await queryInterface.createTable(CATEGORY_TABLE, {
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
      color: {
          type: DataTypes.STRING,
          allowNull: false
      },
      userId: {
          field: "user_id",
          allowNull: false,
          type: DataTypes.INTEGER,
          refereces: {
              model: USER_TABLE,
              key: "id"
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL"
      }
    });
  },

  down: async(queryInterface) => {
    await queryInterface.dropTable(CATEGORY_TABLE);
  }
};
