const express = require("express");
const categoriesRoutes = require("./routes/categories.routes");

const app = express();

//middlewares
app.use(express.json());

app.use(categoriesRoutes);
module.exports = app;