const { Router } = require("express");
const CategoryService = require("../services/category.service");

const passport = require("passport");

const validatorHandler = require('./../middlewares/validator.handler');
const { updateCategorySchema, createCategorySchema, getCategorySchema } = require('./../schemas/category.schema');

const router = Router();
const service = new CategoryService();

router.get("/",
    async (req, res, next) => {
        try {
            const categories = await service.findAll();
            res.json(categories);
        } catch(error) {
            next(error);
        }
    }
);

router.get("/:id",
    validatorHandler(getCategorySchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;

            const category = await service.findOne(id);
            res.json(category);
        } catch(error) {
            next(error);
        }
    }
);

router.post("/",
    passport.authenticate("jwt", {session: false}),
    validatorHandler(createCategorySchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const category = await service.create(body)
            res.json(category);
        } catch (error) {
            next(error);
        }
    }
);

router.patch("/:id",
    validatorHandler(updateCategorySchema, 'params'),
    validatorHandler(updateCategorySchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;

            const category = await service.update(id, body);
            res.json(category);
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

// router.get("/:id/tasks",
//     async (req, res) => {
//         try {
//             const { id } = req.params;

//             const tasks = await service.findAllItsTasks(id);
//             res.json(tasks);
//         } catch(error) {
//             return res.status(500).json({ message: error.message });
//         }
//     }
// );

module.exports = router;