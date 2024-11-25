import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
});

export default mongoose.model(`Users`, userSchema);