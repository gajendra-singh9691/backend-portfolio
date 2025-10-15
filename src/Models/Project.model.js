import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    projectName : {
        type : String,
        required: true
    },
    projectImage : {
        type : String,
        required : true
    },
    projectDetail : {
        type : String,
        required : true
    },
    projectUse : [
        {
            type : String
        }
    ],
    projectGithubLink : {
        type : String,
        required : true
    },
    projectDemoLink : {
        type : String,
        required : true
    }
})

export const project = new mongoose.model('project',projectSchema)