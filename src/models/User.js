const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true, minLength: 8 },

        createdDate: { type: Date, default: Date.now },
        latestLogin: { type: Date, default: Date.now },
    },
    { versionKey: false }
);

module.exports = mongoose.model("User", userSchema);