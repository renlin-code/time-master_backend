const { Model, DataTypes } = require('sequelize');

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
};

class Task extends Model {
    static associate() {
    //associate
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