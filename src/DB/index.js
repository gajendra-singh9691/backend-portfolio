import mongoose from 'mongoose';
import dotenv from 'dotenv'
import { databaseName } from '../Constants/index.js';
dotenv.config({path : '../.env'})
const url = process.env.MONGODB_URL;
console.log("URL : ",url);

const dataBase = databaseName;

const connectDB = async () => {
    console.log(`${url}/${dataBase}`);
    try {
        await mongoose.connect(`${url}/${dataBase}`)
    } catch (error) {
        console.log('error in Database connection',error);
        process.exit(1)
    }
}
export {connectDB}