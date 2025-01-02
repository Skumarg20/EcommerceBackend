import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/ecommerce', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log("DB connected");
    } catch (error) {
        console.log("DB connection failed", error);
    }
    };