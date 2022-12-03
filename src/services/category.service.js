const Category = require("../models/category.model");
const Task = require("../models/task.model")

class CategoryService {
    async findAll() {
        const allCategories = await Category.findAll();
        return allCategories;
    }

    async findOne(id) {
        const category = await Category.findByPk(id);
        return category;
    }

    async create(body) {
        const category = await Category.create(body);
        return category;
    } 
    
    async update(id, body) {
        const category = await this.findOne(id);
        const updatedCategory = await category.update(body);
        return updatedCategory;   
    }
    
    async delete(id) {
        const category = await this.findOne(id);
        await category.destroy();
        return { id };
    }
    
    async findAllItsTasks(id) {
        const tasks = await Task.findAll({
            where: {
                categoryId: id
            }
        });
        return tasks;
    }
}

module.exports = CategoryService;