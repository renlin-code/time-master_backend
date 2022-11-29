const { DataTypes } = require("sequelize");
const sequelize = require("./../database/database");

const Task = sequelize.define("tasks", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.DATE
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