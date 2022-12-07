const { Model, DataTypes } = require('sequelize');
const { CATEGORY_TABLE } = require("./category.model");
const TASK_TABLE = 'tasks';

const TaskSchema = {
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
};

class Task extends Model {
    static associate(models) {
        this.belongsTo(models.Category, {
            as: "category"
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: TASK_TABLE,
            modelName: 'Task',
            timestamps: false
        }
    }
}

module.exports = { TASK_TABLE, TaskSchema, Task };
// module.exports = Task;