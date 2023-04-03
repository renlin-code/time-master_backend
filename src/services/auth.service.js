const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { config } = require("./../config/config")
const nodemailer = require("nodemailer");
const { models } = require('./../libs/sequelize');

const UserService = require("./user.service");
const service = new UserService();


class AuthService {
    async signUp(body) {
        const token = jwt.sign(body.email, config.jwtSecret);

        const user = {
            ...body,
            signUpToken: token
        }
        const userFromDb = await models.User.findOne({
            where: { email: body.email }
        });
        if (userFromDb) {
            if(userFromDb.isConfirmed) {
                throw boom.conflict("this user has already signed up");
            }
            await service.delete(userFromDb.id);
        }
        await service.create(user);
        const link = `${config.frontBaseUrl}/start/confirm-email?token=${token}`;
        const mail = {
            from: `"Time Master"<${config.smtpEmail}>`,
            to: `${body.email}`,
            subject: "Sign up confirmation",
            html: `<p>Please, enter through this link to confirm your email:<br />${link}</p>`,
        }
        const result = await this.sendMail(mail);
        return result;
    }
    
    async confirmEmail(token, password) {
        const payload = jwt.verify(token, config.jwtSecret);
        const user = await service.findOneByEmail(payload);
        if(user.signUpToken !== token) {
            throw boom.unauthorized();
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            throw boom.unauthorized();
        }
        const updatedUser = await service.update(user.id, {
            isConfirmed: true,
            signUpToken: null
        })
        delete updatedUser.dataValues.password;
        delete updatedUser.dataValues.recoveryToken;
        
        return this.signToken(updatedUser);
    }

    async getUser(email, password) {
        const user = await service.findOneByEmail(email);
        if(!user || !user.isConfirmed) {
            throw boom.unauthorized();
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            throw boom.unauthorized();
        }
        delete user.dataValues.password;
        delete user.dataValues.recoveryToken;
        return user;
    }
    signToken(user) {
        const payload = { sub: user.id };

        const token = jwt.sign(payload, config.jwtSecret, {expiresIn: "24h"});
        return {
            user,
            token
        };
    }

    async sendRecovery(email) {
        const user = await service.findOneByEmail(email);
        if(!user) {
            throw boom.unauthorized();
        }
        const userAndToken = this.signToken(user);

        const link = `${config.frontBaseUrl}/start/new-password?token=${userAndToken.token}`;
        await service.update(user.id, {recoveryToken: userAndToken.token});

        const mail = {
            from: `"Time Master"<${config.smtpEmail}>`,
            to: `${user.email}`,
            subject: "Password recovery",
            html: `<p>Please, enter through this link to recover your password:<br />${link}</p>`,
        }
        const result = await this.sendMail(mail);
        return result;
    }

    async changePassword(token, newPassword) {
        try {
            const payload = jwt.verify(token, config.jwtSecret);
            const user = await service.findOne(payload.sub);
            if(user.recoveryToken !== token) {
                throw boom.unauthorized();
            }
            const hash = await bcrypt.hash(newPassword, 10);
            await service.update(user.id, {recoveryToken: null, password: hash});

            const resultUser = await service.findOne(user.id);
            delete resultUser.dataValues.password;
            return this.signToken(resultUser);
        } catch (error) {
            throw boom.unauthorized();
        }
    }

    async sendMail(infoMail) {

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: config.smtpEmail,
              pass: config.smtpPassword
            },
          });   
          
        await transporter.sendMail(infoMail);

        return {message: "mail sent"};
    }
}

module.exports = AuthService;