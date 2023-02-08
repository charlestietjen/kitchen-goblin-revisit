import mongoose from "mongoose";
require('dotenv').config();

mongoose.connect(
    process.env.MONGO_URI || "mongodb://localhost:27017/kitchen-goblin-revisit",
    {}
);

module.exports = mongoose.connection;