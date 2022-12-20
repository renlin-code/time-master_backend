const { Model, DataTypes } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
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
}

class User extends Model {
    static associate(models) {
        this.hasMany(models.Category, {
            as: "categories",
            foreignKey: "userId"
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false
        }
    }
}
  
module.exports = { USER_TABLE, UserSchema, User };