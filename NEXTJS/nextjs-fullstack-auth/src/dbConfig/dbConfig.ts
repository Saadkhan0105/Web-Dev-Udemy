import mongoose from "mongoose";

export async function connectDB() {
    try {
        mongoose.connect(process.env.MONGODB_URI!)
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("MongoDB connected successfully");
        });
        connection.on('error', (err) => {
            console.error("MongoDB connection error. Please make sure MongoDB is running.", err);
            process.exit();
        });
    } catch (error) {
        console.error("Database connection error:", error);
        throw new Error("Failed to connect to the database");
        
    }
}