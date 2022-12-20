'use strict';

const { DataTypes } = require('sequelize');

const { USER_TABLE } = require("./../models/user.model");
const { CATEGORY_TABLE } = require("./../models/category.model");
const { TASK_TABLE } = require("./../models/task.model");


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
      },
      signupToken: {
          field: "signup_token",
          type: DataTypes.STRING,
          allowNull: true
      },
      recoveryToken: {
          field: "recovery_token",
          type: DataTypes.STRING,
          allowNull: true
      }
    });
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
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(TASK_TABLE);

  }
};