const { DataTypes } = require("sequelize");
const sequelize = require("./../database/database");
const Task = require("./task.model");

const Category = sequelize.define("categories", {
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
    color: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: false
});

Category.hasMany(Task, {
    foreignKey: "categoryId",
    sourceKey: "id"
})

Task.belongsTo(Category, {
    foreignKey: "categoryId",
    targetId: "id"
})
module.exports = Category;