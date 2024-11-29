import mongoose from "mongoose";

// Database Connection 
const connectDatabase = async () => {
    try {
        const connectionToDatabase = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "FirstUseCase",
        });
        console.log(`Connected to MongoDB ${connectionToDatabase.connection.host}`);
    } catch (error) {
        console.error(`Database Connection Failed ${error.message}`);
        process.exit(1);
    }
};

export default connectDatabase;
