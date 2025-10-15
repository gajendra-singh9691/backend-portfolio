import mongoose from "mongoose";

const aboutSkillSchema = new mongoose.Schema({
    icon : {
        type : String
    },
    name : {
        type : String
    }
})

export const aboutSkill = mongoose.model('aboutSkill',aboutSkillSchema)