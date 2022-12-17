'use strict';

const { USER_TABLE } = require("./../models/user.model");
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLE, "recovery_token", {
      field: "recovery_token",
      type: Sequelize.DataTypes.STRING,
      allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(USER_TABLE, "recovery_token")
  }
};
