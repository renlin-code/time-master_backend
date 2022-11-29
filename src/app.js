const express = require("express");
const categoriesRoutes = require("./routes/categories.routes");
const tasksRoutes = require("./routes/tasks.routes");

const app = express();

//middlewares
app.use(express.json());

app.use(categoriesRoutes);
app.use(tasksRoutes);

module.exports = app;