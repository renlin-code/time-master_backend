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
        delete user.dataValues.recoveryToken;
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

    async sendRecovery(email) {
        const user = await service.findOneByEmail(email);
        if(!user) {
            throw boom.unauthorized();
        }
        const payload = { sub: user.id };
        const token = jwt.sign(payload, config.jwtSecret, {expiresIn: "15min"});
        const link = `https://fronted.com/recovery?token=${token}`;
        await service.update(user.id, {recoveryToken: token});

        const mail = {
            from: `"Time Master"<${config.smtpEmail}>`,
            to: `${user.email}`,
            subject: "Password recovery",
            html: `<p>Please, enter through this link to recover your password => ${link}</p>`,
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
            return { message: "password changed" };
            
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