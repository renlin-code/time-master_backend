const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');
 
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
}

module.exports = TaskService;