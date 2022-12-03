const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const { config } = require("./../config/config")
const router = Router();

router.post("/login", 
    passport.authenticate("local", {session: false}),
    async (req, res) => {
        try {
            const user = req.user;
            const payload = {
                sub: user.id
            }

            const token = jwt.sign(payload, config.jwtSecret);
            res.json({
                user,
                token
            });
        } catch(error) {
            return res.status(500).json({ message: error.message });
        }
    }
);

module.exports = router;