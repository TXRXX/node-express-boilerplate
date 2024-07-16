// Dependencies
const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Models
const User = require("../models/User");

// Middleware
const { logger } = require("../middleware/logger");
const { limit5ReqIn5Mins } = require("../middleware/limiter");

// Utils
const { validateUsername, validatePassword } = require("../utils/validator");

router.post("/register", limit5ReqIn5Mins, async (req, res) => {
    const { username, password } = req.body;

    if (!validateUsername(username)) {
        return res.status(400).json("Invalid username");
    }
    if (!validatePassword(password)) {
        return res.status(400).json("Invalid password");
    }

    const newUser = new User({
        username,
        password: CryptoJS.AES.encrypt(
            password,
            process.env.HASH_KEY
        ).toString(),
    });

    try {
        const savedUser = await newUser.save();
        logger.info(
            `User ${savedUser.username} registered by ${
                req.headers["x-forwarded-for"] || "N/A"
            }`
        );
        res.status(201).json("User registered successfully");
    } catch (e) {
        res.status(500).json(e);
    }
});

router.post("/login", limit5ReqIn5Mins, async (req, res) => {
    const { username, password } = req.body;
    if (!validateUsername(username)) {
        return res.status(400).json("Invalid username");
    }
    if (!validatePassword(password)) {
        return res.status(400).json("Invalid password");
    }
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json("Not found user!");
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.HASH_KEY
        );
        const OriginalPassWord = hashedPassword.toString(CryptoJS.enc.Utf8);
        if (OriginalPassWord !== password) {
            return res.status(401).json("Username or password is incorrect");
        }
        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.TOKEN_SESSION_DURATION }
        );

        const now = new Date();
        const nowInBKK = new Date(
            now.toLocaleString("en-US", { timeZone: "Asia/Bangkok" })
        );
        user.latestLogin = nowInBKK.toISOString();
        await user.save();

        res.status(200).json({ token });
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;
