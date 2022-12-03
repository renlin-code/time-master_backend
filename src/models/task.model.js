const { DataTypes } = require("sequelize");
const sequelize = require("./../database/database");

const Task = sequelize.define("tasks", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
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
}, {
    timestamps: false
});

module.exports = Task;