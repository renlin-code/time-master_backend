const { Router } = require("express");
const UserService = require("../services/user.service");

const validatorHandler = require('./../middlewares/validator.handler');
const { updateUserSchema, createUserSchema, getUserSchema, getUserSchemaAndTasksDate } = require('./../schemas/user.schema');

const router = Router();
const service = new UserService();

router.get("/",
    async (req, res, next) => {
        try {
            const users = await service.findAll();
            res.json(users);
        } catch(error) {
            next(error);
        }
    }
);

router.get("/:id",
    validatorHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await service.findOne(id);
            res.json(user);
        } catch(error) {
            next(error);
        }
    }
);

router.get("/:id/tasks", 
    validatorHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const tasks = await service.findAllItsTasks(id);
            res.json(tasks);
        } catch(error) {
            next(error);
        }
    }
);

router.get("/:id/tasks/:date", 
    validatorHandler(getUserSchemaAndTasksDate, 'params'),
    async (req, res, next) => {
        try {
            const { id, date } = req.params;
            const tasks = await service.findAllItsTasksByDate(id, date);
            res.json(tasks);
        } catch(error) {
            next(error);
        }
    }
);

router.post("/",
    validatorHandler(createUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const user = await service.create(body)
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
);

router.patch("/:id", 
    validatorHandler(updateUserSchema, 'params'),
    validatorHandler(updateUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;

            const user = await service.update(id, body);
            res.json(user);
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