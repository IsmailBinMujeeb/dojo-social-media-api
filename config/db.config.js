import mongoose from "mongoose";
import logger from "../utils/logger.js";

export default async () => {
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI);
        logger.info("MongoDB connected successfully");
        return db;
    } catch (error) {
        logger.error("MongoDB connection error:", error);
        throw error;
    }
}