const express = require('express');

const usersRoutes = require("./users.routes");
const categoriesRoutes = require("./categories.routes");
const tasksRoutes = require("./tasks.routes");
const authRoutes = require("./auth.routes");

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);

    router.use("/users", usersRoutes);
    router.use("/categories", categoriesRoutes);
    router.use("/tasks", tasksRoutes);
    router.use("/auth", authRoutes);
}

module.exports = routerApi;