const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

const bcrypt = require("bcrypt");

class UserService {
    async findAll() {
        const allUsers = await models.User.findAll();
        return allUsers;
    }

    async findOne(id) {
        const user = await models.User.findByPk(id, {
            include: ["categories"]
        });
        if (!user) {
            throw boom.notFound("User not found");
        }
        return user;
    }

    async create(body) {
        const hash = await bcrypt.hash(body.password, 10);
        const user = await models.User.create({
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





    async findOneByEmail(email) {
        const user = await models.User.findOne({
            where: { email }
        });
        if (!user) {
            throw boom.notFound("User not found");
        }
        return user;
    }

    async findAllItsTasks(id) {
        const user = this.findOne(id);
        const categories = await models.Category.findAll({
            where: {
                userId: id
            }
        });
        const tasks = await Promise.all(
            categories.map (async i => {
                return await models.Task.findAll({
                    where: {
                        categoryId: i.dataValues.id,
                    },
                    include: ["category"]
                })
            })
        )
        const flattedTasks = tasks.flat();
        return flattedTasks;
    }

    async findAllItsTasksByDate(id, date) {
        const user = this.findOne(id);
        const categories = await models.Category.findAll({
            where: {
                userId: id
            }
        });
        const tasks = await Promise.all(
            categories.map (async i => {
                return await models.Task.findAll({
                    where: {
                        categoryId: i.dataValues.id,
                        date
                    },
                    include: ["category"]
                })
            })
        )
        const flattedTasks = tasks.flat();
        return flattedTasks;
    }

}


module.exports = UserService;