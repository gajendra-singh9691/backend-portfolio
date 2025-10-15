import mongoose from "mongoose";

const socialMediaSchema = new mongoose.Schema({
    instagram : {
        type : String
    },
    linkdin : {
        type : String
    },
    github : {
        type : String
    }
})

export const socialMedia = mongoose.model('socialMedia',socialMediaSchema)
