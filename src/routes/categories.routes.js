const { Router } = require("express");
const CategoryServices = require("../services/category.service");

const router = Router();
const service = new CategoryServices();

router.get("/categories", async (req, res) => {
    try {
        const categories = await service.findAll();
        res.json(categories);
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get("/categories/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const category = await service.findOne(id);
        res.json(category);
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post("/categories", async (req, res) => {
    try {
        const body = req.body;
        const category = await service.create(body)
        res.json(category);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.patch("/categories/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;

        const category = await service.update(id, body);
        res.json(category);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.delete("/categories/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await service.delete(id);
        res.status(201).json({id});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get("/categories/:id/tasks", async (req, res) => {
    try {
        const { id } = req.params;

        const tasks = await service.findAllItsTasks(id);
        res.json(tasks);
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;