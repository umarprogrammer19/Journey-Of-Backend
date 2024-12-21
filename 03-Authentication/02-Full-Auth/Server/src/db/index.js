import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        const dbHost = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "firstAuthentication",
        });
        console.log(`MongoDb Connected ${dbHost.connection.host}`);
    } catch (err) {
        console.log("Connection Failed", err);
        process.exit(1);
    }
}