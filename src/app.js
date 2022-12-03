const express = require("express");
const usersRoutes = require("./routes/users.routes");
const categoriesRoutes = require("./routes/categories.routes");
const tasksRoutes = require("./routes/tasks.routes");
const authRoutes = require("./routes/auth.routes");

require("./utils/auth");

const app = express();

//middlewares
app.use(express.json());

app.use(usersRoutes);
app.use(categoriesRoutes);
app.use(tasksRoutes);
app.use(authRoutes);

module.exports = app;