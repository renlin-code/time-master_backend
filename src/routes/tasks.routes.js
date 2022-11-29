const { Router } = require("express");
const { getTasks, getTask, createTask, updateTask, deleteTask } = require("./../controllers/tasks.controller");

const router = Router();

router.get("/tasks", getTasks);
router.get("/tasks/:id", getTask);
router.post("/tasks", createTask);
router.patch("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);


module.exports = router;