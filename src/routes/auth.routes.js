const { Router } = require("express");
const passport = require("passport");

const router = Router();

router.post("/login", 
    passport.authenticate("local", {session: false}),
    async (req, res) => {
        try {
            res.json(req.user);
        } catch(error) {
            return res.status(500).json({ message: error.message });
        }
    }
);

module.exports = router;