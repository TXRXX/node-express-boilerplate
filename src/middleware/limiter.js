const rateLimit = require("express-rate-limit");

// LESS SENSITIVE
const limit10ReqIn5Mins = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message: "Too many requests",
    keyGenerator: function (req) {
        return req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    },
});

// HIGHLY SENSITIVE
const limit5ReqIn5Mins = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: "Too many requests",
    keyGenerator: function (req) {
        return req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    },
});

// VERY HIGHLY SENSITIVE
const limit2ReqIn5Mins = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 2, // limit each IP to 2 requests per windowMs
    message: "Too many requests",
    keyGenerator: function (req) {
        return req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    },
});

module.exports = {
    limit10ReqIn5Mins,
    limit5ReqIn5Mins,
    limit2ReqIn5Mins,
};
