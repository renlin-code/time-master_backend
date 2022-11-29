const Category = require("./../models/category.model")

const getCategories = async (req, res) => {
    try {
        const allCategories = await Category.findAll();
        res.json(allCategories);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByPk(id);
        res.json(category); 
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const createCategory = async (req, res) => {
    try {
        const {name, color} = req.body;

        const newCategory = await Category.create({
            name,
            color
        })
        res.json(newCategory);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;

        const category = await Category.findByPk(id);
        const updatedCategory = await category.update(body);
        res.json(updatedCategory);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        await Category.destroy({
            where: {
                id,
            }
        })
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { getCategories, getCategory, createCategory, updateCategory, deleteCategory };