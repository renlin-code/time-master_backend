const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { config } = require("./../config/config")
const nodemailer = require("nodemailer");

const UserService = require("./user.service");
const service = new UserService();


class AuthService {
    async getUser(email, password) {
        const user = await service.findOneByEmail(email);
        if(!user) {
            throw boom.unauthorized();
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            throw boom.unauthorized();
        }
        delete user.dataValues.password;
        return user;

    }
    signToken(user) {
        const payload = {
            sub: user.id
        }

        const token = jwt.sign(payload, config.jwtSecret);
        return {
            user,
            token
        };
    }

    async sendMail(email) {
        const user = await service.findOneByEmail(email);

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: "info.timemaster@gmail.com",
              pass: config.emailPassword
            },
          });   
          
        await transporter.sendMail({
            from: "info.timemaster@gmail.com", // sender address
            to: `${user.email}`, // list of receivers
            subject: "Test Mail", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

        return {message: "mail sent"};
    }
}

module.exports = AuthService;