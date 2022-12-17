const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { config } = require("./../config/config")
const nodemailer = require("nodemailer");

const UserService = require("./user.service");
const service = new UserService();


class AuthService {
    async signIn(body) {
        const user = await service.create(body);
        const userWithToken = this.signToken(body);
        const link = `https://fronted.com/dashboard?token=${userWithToken.token}`;
        const mail = {
            from: `"Time Master"<${config.smtpEmail}>`,
            to: `${user.email}`,
            subject: "Sign in confirmation",
            html: `<p>Please, enter through this link to confirm your email => ${link}</p>`,
        }
        const result = await this.sendMail(mail);
        return result;
    }





    
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
        const payload = { sub: user.id };

        const token = jwt.sign(payload, config.jwtSecret, {expiresIn: "15min"});
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

        const link = `https://fronted.com/recovery?token=${userAndToken.token}`;
        await service.update(user.id, {recoveryToken: userAndToken.token});

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