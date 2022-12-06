const { Model, DataTypes } = require('sequelize');
const { USER_TABLE } = require("./user.model");

const CATEGORY_TABLE = 'categories';

const CategorySchema = {
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
};

class Category extends Model {
    static associate(models) {
        this.hasMany(models.Task, {
            as: "tasks",
            foreignKey: "categoryId"
        });
        this.belongsTo(models.User, {
            as: "user" 
        })

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: CATEGORY_TABLE,
            modelName: 'Category',
            timestamps: false
        }
    }
}

module.exports = { CATEGORY_TABLE, CategorySchema, Category };