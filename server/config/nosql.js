const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const mongoUri = process.env.MONGO_URI;

const connectDB = async function () {
    try {
        const serverSelectionTimeoutMS = 10000;
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: serverSelectionTimeoutMS
        });
        console.log("mongodb connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        if (error.cause) {
            console.error("Cause:", error.cause);
        }
        process.exit(1);
    }
};

module.exports = connectDB;
