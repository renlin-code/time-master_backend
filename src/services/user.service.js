const User = require("../models/user.model");
const Task = require("../models/task.model")
const Category = require("../models/category.model");

const bcrypt = require("bcrypt");

class UserServices {
    async findAll() {
        const allUsers = await User.findAll();
        return allUsers;
    }

    async findOne(id) {
        const user = await User.findByPk(id);
        return user;
    }

    async findOneByEmail(email) {
        const user = await User.findOne({
            where: { email }
        });
        return user;
    }

    async create(body) {
        const hash = await bcrypt.hash(body.password, 10);
        const user = await User.create({
            ...body,
            password: hash
        });
        delete user.dataValues.password;
        return user;
    } 
    
    async update(id, body) {
        const user = await this.findOne(id);
        const updatedUser = await user.update(body);
        return updatedUser;   
    }
    
    async delete(id) {
        const user = await this.findOne(id);
        await user.destroy();
        return { id };
    }


    async findAllItsCategories(id) {
        const categories = await Category.findAll({
            where: {
                userId: id
            }
        });
        return categories;
    }

    async findAllItsTasks(id) {
        const categories = await this.findAllItsCategories(id);
        const tasks = await Promise.all(
            categories.map (async i => {
                return await Task.findAll({
                    where: {
                        categoryId: i.dataValues.id
                    }
                })
            })
        )
        const flattedTasks = tasks.flat();
        return flattedTasks;
    }
}


module.exports = UserServices;