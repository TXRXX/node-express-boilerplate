const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { logger } = require("./src/middleware/logger");

const envFile =
    process.env.NODE_ENV === "production"
        ? ".env.production"
        : ".env.development";
dotenv.config({ path: envFile });

const userRoute = require("./src/routes/user");

app.use(express.json());
app.use(cors());

// Convert mongoDB schema _id to id
mongoose.set("toJSON", {
    virtuals: true,
    transform: (doc, converted) => {
        delete converted._id;
    },
});

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        logger.info(
            `✅ Connected to MongoDB\nDatabase URI : ${process.env.MONGODB_URI}\n`
        );
    })
    .catch((err) => console.log(err));

// Initialize Server
app.listen(process.env.SERVER_PORT || 3000, () => {
    logger.info(
        `🚀 Server is running\nEnvironment : ${
            process.env.NODE_ENV
        }\nServer Port : ${process.env.SERVER_PORT || 3000}
        `
    );
});

// Routes
app.use("/api/user", userRoute);
