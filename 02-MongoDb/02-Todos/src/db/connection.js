import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "TodoApp",
        });
        console.log(`Database Connected Successfully ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}