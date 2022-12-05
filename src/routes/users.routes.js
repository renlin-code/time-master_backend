const { Router } = require("express");
const UserService = require("../services/user.service");

const validatorHandler = require('./../middlewares/validator.handler');
const { updateUserSchema, createUserSchema, getUserSchema } = require('./../schemas/user.schema');

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

// router.get("/:id/categories", async (req, res) => {
//     try {
//         const { id } = req.params;
        
//         const categories = await service.findAllItsCategories(id);
//         res.json(categories);
//     } catch(error) {
//         return res.status(500).json({ message: error.message });
//     }
// });

// router.get("/:id/tasks", async (req, res) => {
//     try {
//         const { id } = req.params;

//         const tasks = await service.findAllItsTasks(id);
//         res.json(tasks);
//     } catch(error) {
//         return res.status(500).json({ message: error.message });
//     }
// });

module.exports = router;