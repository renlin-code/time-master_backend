const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Category = require("./category.model");

const User = sequelize.define("users", {
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
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

User.hasMany(Category, {
    foreignKey: "userId",
    sourceKey: "id"
})

Category.belongsTo(User, {
    foreignKey: "userId",
    targetId: "id"
})
module.exports = User;