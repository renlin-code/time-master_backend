const Task = require("../models/task.model")

const getTasks = async (req, res) => {
    try {
        const allTasks = await Task.findAll();
        res.json(allTasks);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findByPk(id);
        res.json(task); 
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const createTask = async (req, res) => {
    try {
        const {name, date, important, categoryId} = req.body;

        const newTask = await Task.create({
            name,
            date,
            important,
            categoryId
        })
        res.json(newTask);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;

        const task = await Task.findByPk(id);
        const updatedTask = await task.update(body);
        res.json(updatedTask);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        await Task.destroy({
            where: {
                id,
            }
        })
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { getTasks, getTask, createTask, updateTask, deleteTask };