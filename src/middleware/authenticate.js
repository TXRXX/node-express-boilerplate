const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            let foundUser;
            if (user) {
                foundUser = await User.findById(user.id);
            }
            if (foundUser && foundUser._doc) {
                const { password, ...others } = foundUser._doc;
                req.user = others;
            }
            next();
        });
    } else {
        return res.status(401).json("Access Denied");
    }
};

module.exports = { authenticate };
