import mongoose from "mongoose";

const connectDatabase = async () => {
    try {
        const connectionToDatabase = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "FirstUseCase",
        });
        console.log(`Connected to MongoDB ${connectionToDatabase.connection.host}`);
    } catch (error) {
        console.error(`Database Connection Failed ${error.message}`);
    }
}