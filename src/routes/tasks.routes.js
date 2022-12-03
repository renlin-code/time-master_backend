const { Router } = require("express");
const TasksService = require("../services/tasks.service");

const router = Router();
const tasksService = new TasksService();

router.get("/tasks", async (req, res) => {
    try {
        const tasks = await tasksService.findAll();
        res.json(tasks);
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const task = await tasksService.findOne(id);
        res.json(task);
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post("/tasks", async (req, res) => {
    try {
        const body = req.body;
        const task = await tasksService.create(body)
        res.json(task);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.patch("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;

        const task = await tasksService.update(id, body);
        res.json(task);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
router.delete("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await tasksService.delete(id);
        res.status(201).json({id});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;