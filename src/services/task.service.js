const Task = require("../models/task.model")

class TaskService {
    async findAll() {
        const allTasks = await Task.findAll();
        return allTasks;
    }

    async findOne(id) {
        const task = await Task.findByPk(id);
        return task;
    }

    async create(body) {
        const task = await Task.create(body);
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