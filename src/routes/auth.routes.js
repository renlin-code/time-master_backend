const { Router } = require("express");
const passport = require("passport");

const validatorHandler = require('./../middlewares/validator.handler');
const { createUserSchema, signInUserSchema, confirmEmailUserSchema, recoveryUserSchema } = require('./../schemas/user.schema');

const AuthService = require("./../services/auth.service");
const service = new AuthService();


const router = Router();

router.post("/signup", 
    validatorHandler(createUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const result = await service.signUp(body);
            res.json(result);
        } catch(error) {
            next(error);
        }
    }
);

router.post("/confirm-email", 
    validatorHandler(confirmEmailUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const { token, password } = req.body;
            const result = await service.confirmEmail(token, password);
            res.json(result);
        } catch(error) {
            next(error);
        }
    }
);

router.post("/signin", 
    validatorHandler(signInUserSchema, 'body'),
    passport.authenticate("local", {session: false}),
    async (req, res, next) => {
        try {
            const user = req.user;
            res.json(service.signToken(user));
        } catch(error) {
            next(error);
        }
    }
);

router.post("/recovery", 
    async (req, res, next) => {
        try {
            const { email } = req.body;
            const result = await service.sendRecovery(email);
            res.json(result);
        } catch(error) {
            next(error);
        }
    }
);

router.post("/change-password", 
    validatorHandler(recoveryUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const { token, newPassword } = req.body;
            const result = await service.changePassword(token, newPassword);
            res.json(result);
        } catch(error) {
            next(error);
        }
    }
);

module.exports = router;