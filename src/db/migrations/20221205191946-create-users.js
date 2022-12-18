'use strict';

const { USER_TABLE } = require("./../models/user.model");
const { DataTypes } = require('sequelize');

module.exports = {
  up: async(queryInterface) => {
    await queryInterface.createTable(USER_TABLE, {
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
      email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false
      }
    });
  },

  down: async(queryInterface) => {
    await queryInterface.dropTable(USER_TABLE);
  }
};
