import mongoose from "mongoose";
const homeSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    titles : {
        type : [
            {
                type : String,
            }
        ]
    },
    detail : {
        type : String
    },
    image : {
        type : String
    }
})

export const home = mongoose.model('home',homeSchema)