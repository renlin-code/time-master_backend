const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const { Op } = require("sequelize");

class TaskService {
    async findAll() {
        const allTasks = await models.Task.findAll({
            include: ["category"]
        });
        return allTasks;
    }

    async findOne(id) {
        const task = await models.Task.findByPk(id, {
            include: ["category"]
        });
        if (!task) {
            throw boom.notFound("Task not found");
        }
        return task;
    }

    async create(body) {
        const task = await models.Task.create(body);
        return task;
    } 
    
    async update(id, body) {
        const task = await this.findOne(id);
        const updatedTask = await task.update(body);
        return updatedTask;   
    }
    
    async delete(id) {
        const task = await this.findOne(id);
        await task.destroy();
        return { id };
    }   


    
    async findByUser(userId, date, from, to) {
        const options = {
            where: {
                "$category.user.id$": userId
            },
            include: [
                {
                    association: "category",
                    include: ["user"]
                }
            ]
        }
        if (date) {
            options.where.date = date;
        } else {
            if (from && to) {
                options.where.date = {[Op.between]: [from, to]}
            }
        }
        
        const tasks = await models.Task.findAll(options);

        tasks.map (i => {
            delete i.dataValues.category.dataValues.user;
            delete i.dataValues.category.dataValues.userId;
        })

        return tasks;
    }

    async searchTasks(userId, searchQuery) {
        const options = {
            where: {
                [Op.and]: [
                    { "$category.user.id$": userId },
                    { name: { [Op.iLike]: `%${searchQuery}%` } }
                ],
                
            },
            include: [
                {
                    association: "category",
                    include: ["user"]
                }
            ]
        }
        const tasks = await models.Task.findAll(options);

        tasks.map (i => {
            delete i.dataValues.category.dataValues.user;
        })

        return tasks;
    }
}

module.exports = TaskService;