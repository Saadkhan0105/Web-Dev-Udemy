/*
whenever you are connecting with the database you will need to remember 2 things:
1. Database connection may not always go through,there is always a chance of a an error. That means always wrap your database connection code in a try-catch block.
2. The database is always in another connection. The whole gist of this phrase is that database connection takes time. You will always want to async-await your request.
*/

import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

        console.log(` \n MongoDB connected successfully! DB host: ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log("Error connecting to MongoDB", error);
        process.exit(1);
        
    }
}

export default connectDB;