import mongoose from "mongoose";

const aboutParagraphSchema = new mongoose.Schema({
    Detail: {
        type: [String], // or [Object] if needed
    }
});
export const aboutParagraph = mongoose.model('aboutParagraph', aboutParagraphSchema);