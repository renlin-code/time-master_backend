const { Router } = require("express");
const TaskService = require("../services/task.service");

const validatorHandler = require('./../middlewares/validator.handler');
const { updateTaskSchema, createTaskSchema, getTaskSchema } = require('./../schemas/task.schema');

const router = Router();
const service = new TaskService();


router.get("/", 
    async (req, res, next) => {
        try {
            const tasks = await service.findAll();
            res.json(tasks);
        } catch(error) {
            next(error);
        }
    }
);

router.get("/:id", 
    validatorHandler(getTaskSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;

            const task = await service.findOne(id);
            res.json(task);
        } catch(error) {
            next(error);
        }
    }
);

router.post("/", 
    validatorHandler(createTaskSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const task = await service.create(body)
            res.json(task);
        } catch (error) {
            next(error);
        }
    }
);

router.patch("/:id", 
    validatorHandler(updateTaskSchema, 'params'),
    validatorHandler(updateTaskSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;

            const task = await service.update(id, body);
            res.json(task);
        } catch (error) {
            next(error);
        }
    }
);
router.delete("/:id", 
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id);
            res.status(201).json({id});
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;