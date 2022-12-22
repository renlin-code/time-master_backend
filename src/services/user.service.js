const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

const bcrypt = require("bcrypt");

class UserService {
    async findAll() {
        const allUsers = await models.User.findAll();
        return allUsers;
    }

    async findOne(id) {
        const user = await models.User.findByPk(id, {
            include: ["categories"]
        });
        if (!user) {
            throw boom.notFound("User not found");
        }
        return user;
    }

    async create(body) {
        const userFromDb = await models.User.findOne({
            where: { email: body.email }
        });
        if (userFromDb) {
            throw boom.conflict("This user already exists");
        }
        const hash = await bcrypt.hash(body.password, 10);
        const user = await models.User.create({
            ...body,
            password: hash
        });
        delete user.password;
        return user;
    } 
    
    async update(id, body) {
        const user = await this.findOne(id);
        const updatedUser = await user.update(body);
        return updatedUser;   
    }
    
    async delete(id) {
        const user = await this.findOne(id);
        await user.destroy();
        return { id };
    }



    async findOneByEmail(email) {
        const user = await models.User.findOne({
            where: { email }
        });
        if (!user) {
            throw boom.notFound("User not found");
        }
        return user;
    }
}


module.exports = UserService;