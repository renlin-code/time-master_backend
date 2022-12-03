const { Router } = require("express");
const UserService = require("../services/user.service");

const router = Router();
const service = new UserService();

router.get("/users", async (req, res) => {
    try {
        const users = await service.findAll();
        res.json(users);
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const user = await service.findOne(id);
        res.json(user);
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post("/users", async (req, res) => {
    try {
        const body = req.body;
        const user = await service.create(body)
        res.json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.patch("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;

        const user = await service.update(id, body);
        res.json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await service.delete(id);
        res.status(201).json({id});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get("/users/:id/categories", async (req, res) => {
    try {
        const { id } = req.params;
        
        const categories = await service.findAllItsCategories(id);
        res.json(categories);
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get("/users/:id/tasks", async (req, res) => {
    try {
        const { id } = req.params;

        const tasks = await service.findAllItsTasks(id);
        res.json(tasks);
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;