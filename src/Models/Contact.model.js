import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true,
    trim : true,
  },
  email : {
    type : String,
    required : true,
  },
  message : {
    type : String,
    required : true,
  }
})

export const contact = mongoose.model('contact',ContactSchema)