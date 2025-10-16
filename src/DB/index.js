// import mongoose from 'mongoose';
// import dotenv from 'dotenv'
// import { databaseName } from '../Constants/index.js';
// dotenv.config({path : '../.env'})
// const url = process.env.MONGO_URI;
// console.log("URL : ",url);

// const dataBase = databaseName;

// const connectDB = async () => {
//     console.log(`${url}/${dataBase}`);
//     try {
//         await mongoose.connect(`${url}/${dataBase}`)
//     } catch (error) {
//         console.log('error in Database connection',error);
//         process.exit(1)
//     }
// }
// export {connectDB}


// import mongoose from "mongoose";

// export const connectDB = async () => {
//   try {
//     const uri = process.env.MONGO_URI;

//     if (!uri) {
//       throw new Error("❌ MONGO_URI not found in environment variables");
//     }

//     const conn = await mongoose.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`❌ MongoDB Connection Error: ${error.message}`);
//   }
// };



import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return; // already connected

  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("❌ MONGO_URI not found in environment variables");

    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    throw error;
  }
};
