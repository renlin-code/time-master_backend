const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');


class CategoryService {
    async findAll() {
        const allCategories = await models.Category.findAll();
        return allCategories;
    }

    async findOne(id) {
        const category = await models.Category.findByPk(id);
        if (!category) {
            throw boom.notFound("Category not found");
        }
        return category;
    }

    async create(body) {
        const category = await models.Category.create(body);
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
    
    // async findAllItsTasks(id) {
    //     const tasks = await Task.findAll({
    //         where: {
    //             categoryId: id
    //         }
    //     });
    //     return tasks;
    // }
}

module.exports = CategoryService;