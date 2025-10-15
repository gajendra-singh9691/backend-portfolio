import dotenv from "dotenv"
import { connectDB } from "./DB/index.js";
import app from "./app.js";
dotenv.config({path : '../.env'});
const port = process.env.PORT;
connectDB()

.then(()=>{
    console.log('DataBase connected successfully');
    app.listen(port,()=>{
        console.log(`Server start at PORT NO ${port}`);
    })
})
.catch((error)=>{
    console.log('Error in DataBase connection',error);
})