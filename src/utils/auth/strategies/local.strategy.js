const { Strategy } = require("passport-local");
const bcrypt = require("bcrypt");
const UserService = require("./../../../services/user.service");

const service = new UserService();

const LocalStrategy = new Strategy({
        usernameField: "email",
        passwordField: "password"
    },
    async (email, password, done) => {
        try {
            const user = await service.findOneByEmail(email);
            if(!user) {
                done("Unauthorized", false);
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) {
                done("Unauthorized", false);
            }
            delete user.dataValues.password;
            done(null, user);

        } catch (error) {
            done(error, false);
        }
    }
);

module.exports = LocalStrategy;