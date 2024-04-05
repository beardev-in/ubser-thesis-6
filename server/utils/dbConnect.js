import mongoose from "mongoose";
import "dotenv/config"; 

async function connectDB() {
    try {
        await mongoose.connect(`${process.env.MONGODB_ATLAS_SERVER_INFO}/${process.env.DATABASE_NAME}`); 
        console.log("Mongo DB Connected");
    } catch (error) {
        console.log(error);
    }
}

connectDB();