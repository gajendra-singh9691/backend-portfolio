import { aboutParagraph } from "../Models/AboutParagraph.model.js";
import { aboutSkill } from "../Models/AboutSkills.model.js";
import ApiError from "../Utils/ApiError.js";
import ApiResponse from "../Utils/ApiResponse.js"

const removeAboutParagrafh = async (req, res) => {
    try {
        const { index } = req.body;
        if (!index) {
            throw new ApiError(404, "Paragraf number is required");
        }

        const doc = await aboutParagraph.findOne();

        doc.Detail.splice(index-1, 1);

        await doc.save();

        return res.status(201).json(
            new ApiResponse(201, "Paragraph removed successfully", doc)
        )
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal server error", error.message)
        )
    }
}

const removeSkill = async (req, res) => {
    try {
        const { name, all } = req.body;

        const existingany = await aboutSkill.find()
        if (!existingany ) {
            throw new ApiError(404,"Thier is no skill, So nothing for delete")
        }
        console.log(name);
        console.log(all);
        
        
        const isNewData = (all === true || all === "true");

        if (!name && !isNewData) {
            throw new ApiError(404, "Skill name must required")
        }
        let doc = await aboutSkill.find();
        if (doc.length == 0) {
            throw new ApiError(404, "Zero Skill in list")
        }

        if (isNewData) {
            const deletedoc = await aboutSkill.deleteMany({});
            res.status(200).json(
                new ApiResponse(200, "All skills remove successfully", deletedoc)
            )
        }
        else {
            const deletedSkill = await aboutSkill.deleteOne({ name: new RegExp(`^${name}$`, 'i') });

            if (deletedSkill.deletedCount === 0) {
                throw new ApiError(404, `${name} skill not found`);
            }

            const updatedList = await aboutSkill.find(); // fetch updated list after deletion

            res.status(200).json(
                new ApiResponse(200, `${name} skill is removed successfully`, updatedList)
            );

        }

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal server error", error.message)
        )
    }
}

export { removeAboutParagrafh, removeSkill }