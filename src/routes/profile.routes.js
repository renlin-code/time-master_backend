const { Router } = require("express");
const passport = require("passport");
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");

const TaskService = require("../services/task.service");
const CategoryService = require("../services/category.service");
const UserService = require("./../services/user.service");

const validatorHandler = require('./../middlewares/validator.handler');
const { editProfileUserSchema, deleteProfileUserSchema } = require('./../schemas/user.schema');
const { getTaskSchema, createTaskSchema, updateTaskSchema, queryTaskDateSchema, monthTasksSchema, searchTaskSchema } = require('./../schemas/task.schema');
const { getCategorySchema, createCategoryByUserSchema, updateCategoryByUserSchema } = require('./../schemas/category.schema');
const { json } = require("sequelize");

const router = Router();
const userService = new UserService();
const taskService = new TaskService();
const categoryService = new CategoryService();

router.get("/", 
    passport.authenticate("jwt", {session: false}),
    async (req, res, next) => {
        try {
            const userId = req.user.sub;
            const user = await userService.findOne(userId);
            delete user.dataValues.password;
            res.json(user);
        } catch(error) {
            next(error);
        }
    }
);

router.patch("/", 
    validatorHandler(editProfileUserSchema, 'body'),
    passport.authenticate("jwt", {session: false}),
    async (req, res, next) => {
        try {
            const userId = req.user.sub;
            const body = req.body;
            const editedUser = await userService.update(userId, body);
            delete editedUser.dataValues.password;
            res.json(editedUser);
        } catch(error) {
            next(error);
        }
    }
);

router.post("/", 
    validatorHandler(deleteProfileUserSchema, 'body'),
    passport.authenticate("jwt", {session: false}),
    async (req, res, next) => {
        try {
            const userId = req.user.sub;
            const { password } = req.body;
            const user = await userService.findOne(userId);

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) {
                throw boom.unauthorized();
            }    
            await userService.delete(userId);
            delete user.dataValues.password;
            res.json({ userId });
        } catch(error) {
            next(error);
        }
    }
);




router.get("/my-tasks", 
    validatorHandler(queryTaskDateSchema, 'query'),
    passport.authenticate("jwt", {session: false}),
    async (req, res, next) => {
        try {
            const userId = req.user.sub;
            const { date, from, to } = req.query;

            const tasks = await taskService.findByUser(userId, date, from, to);
            res.json(tasks);
        } catch(error) {
            next(error);
        }
    }
);

router.get("/my-tasks/:id", 
    validatorHandler(getTaskSchema, 'params'),
    passport.authenticate("jwt", {session: false}),
    async (req, res, next) => {
        try {
            const { id } = req.params;

            const userId = req.user.sub;
            const tasks = await taskService.findByUser(userId);

            const isHisTask = tasks.some(i => i.id == id);
            if(!isHisTask) {
                throw boom.unauthorized();
            }

            const task = await taskService.findOne(id);
            res.json(task);
        } catch(error) {
            next(error);
        }
    }
);

router.get("/search-tasks", 
    validatorHandler(searchTaskSchema, 'query'),
    passport.authenticate("jwt", {session: false}),
    async (req, res, next) => {
        try {
            const userId = req.user.sub;
            const { searchQuery } = req.query;

            const tasks = await taskService.searchTasks(userId, searchQuery);
            res.json(tasks);
        } catch(error) {
            next(error);
        }
    }
);

router.post("/my-tasks", 
    validatorHandler(createTaskSchema, 'body'),
    passport.authenticate("jwt", {session: false}),
    async (req, res, next) => {
        try {
            const userId = req.user.sub;
            const body = req.body;
            const { categoryId } = body;

            const categories = await categoryService.findByUser(userId);

            const isHisCategory = categories.some(i => i.id == categoryId);
            if(!isHisCategory) {
                throw boom.unauthorized();
            }

            const task = await taskService.create(body)
            res.json(task);
        } catch(error) {
            next(error);
        }
    }
);

router.patch("/my-tasks/:id",
    validatorHandler(updateTaskSchema, 'params'),
    validatorHandler(updateTaskSchema, 'body'),
    passport.authenticate("jwt", {session: false}),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const { categoryId } = body;

            const userId = req.user.sub;

            const tasks = await taskService.findByUser(userId);

            const isHisTask = tasks.some(i => i.id == id);
            if(!isHisTask) {
                throw boom.unauthorized();
            }

            const categories = await categoryService.findByUser(userId);

            const isHisCategory = categories.some(i => i.id == categoryId);

            if(categoryId && !isHisCategory) {
                throw boom.unauthorized();
            }

            const task = await taskService.update(id, body);
            res.json(task);
        } catch (error) {
            next(error);
        }
    }
);

router.delete("/my-tasks/:id",
    passport.authenticate("jwt", {session: false}),
    async (req, res, next) => {
        try {
            const { id } = req.params;

            const userId = req.user.sub;
            const tasks = await taskService.findByUser(userId);

            const isHisTask = tasks.some(i => i.id == id);
            if(!isHisTask) {
                throw boom.unauthorized();
            }

            const task = await taskService.delete(id);
            res.json(task);
        } catch (error) {
            next(error);
        }
    }
);



router.get("/my-categories", 
    passport.authenticate("jwt", {session: false}),
    async (req, res, next) => {
        try {
            const userId = req.user.sub;
            const categories = await categoryService.findByUser(userId);
            res.json(categories);
        } catch(error) {
            next(error);
        }
    }
);

router.get("/my-categories/:id", 
    validatorHandler(getCategorySchema, 'params'),
    passport.authenticate("jwt", {session: false}),
    async (req, res, next) => {
        try {
            const { id } = req.params;

            const userId = req.user.sub;
            const categories = await categoryService.findByUser(userId);

            const isHisCategory = categories.some(i => i.id == id);
            if(!isHisCategory) {
                throw boom.unauthorized();
            }

            const category = await categoryService.findOne(id);

            delete category.dataValues.user;
            res.json(category);
        } catch(error) {
            next(error);
        }
    }
);

router.post("/my-categories", 
    validatorHandler(createCategoryByUserSchema, 'body'),
    passport.authenticate("jwt", {session: false}),
    async (req, res, next) => {
        try {
            const userId = req.user.sub;
            const body = {
                ...req.body,
                userId
            }
            const category = await categoryService.create(body)
            res.json(category);
        } catch(error) {
            next(error);
        }
    }
);

router.patch("/my-categories/:id",
    validatorHandler(updateCategoryByUserSchema, 'params'),
    validatorHandler(updateCategoryByUserSchema, 'body'),
    passport.authenticate("jwt", {session: false}),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;

            const userId = req.user.sub;
            const categories = await categoryService.findByUser(userId);

            const isHisCategory = categories.some(i => i.id == id);
            if(!isHisCategory) {
                throw boom.unauthorized();
            }

            const category = await categoryService.update(id, body);
            delete category.dataValues.user;
            res.json(category);
        } catch (error) {
            next(error);
        }
    }
);

router.delete("/my-categories/:id",
    passport.authenticate("jwt", {session: false}),
    async (req, res, next) => {
        try {
            const { id } = req.params;

            const userId = req.user.sub;
            const categories = await categoryService.findByUser(userId);

            const isHisCategory = categories.some(i => i.id == id);
            if(!isHisCategory) {
                throw boom.unauthorized();
            }
            if(categories.length <= 1) {
                throw boom.forbidden("Unable to delete the last category");
            }
            const category = await categoryService.delete(id);
            res.json(category);
        } catch (error) {
            next(error);
        }
    }
);




module.exports = router;