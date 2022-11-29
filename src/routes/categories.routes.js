const { Router } = require("express");
const { getCategories, getCategory, createCategory, updateCategory, deleteCategory } = require("./../controllers/categories.controller");

const router = Router();

router.get("/categories", getCategories);
router.get("/categories/:id", getCategory);
router.post("/categories", createCategory);
router.patch("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);


module.exports = router;