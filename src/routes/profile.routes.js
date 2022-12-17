const { Router } = require("express");
const passport = require("passport");

const TaskService = require("../services/task.service");
const CategoryService = require("../services/category.service");

const validatorHandler = require('./../middlewares/validator.handler');
const { queryTaskSchema } = require('./../schemas/task.schema');


const router = Router();
const taskService = new TaskService();
const categoryService = new CategoryService();

router.get("/my-tasks", 
    validatorHandler(queryTaskSchema, 'query'),
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        try {
            const user = req.user;
            const { date } = req.query;

            const tasks = await taskService.findByUser(user.sub, date);
            res.json(tasks);
        } catch(error) {
            return res.status(500).json({ message: error.message });
        }
    }
);

router.get("/my-categories", 
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        try {
            const user = req.user;
            const categories = await categoryService.findByUser(user.sub);
            res.json(categories);
        } catch(error) {
            return res.status(500).json({ message: error.message });
        }
    }
);


module.exports = router;