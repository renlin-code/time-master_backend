'use strict';

const { USER_TABLE } = require("./../models/user.model");
const { DataTypes } = require('sequelize');

module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(USER_TABLE, "recovery_token", {
      field: "recovery_token",
      type: DataTypes.STRING,
      allowNull: true
    })
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, "recovery_token")
  }
};
