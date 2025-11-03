import { aboutParagraph } from "../Models/AboutParagraph.model.js";
import { aboutSkill } from "../Models/AboutSkills.model.js";
import ApiError from "../Utils/ApiError.js";
import ApiResponse from "../Utils/ApiResponse.js";

const sendaboutdata = async (req,res) => {
    try {
        const data = await aboutParagraph.find()
        if (!data) {
            throw new ApiError(404,"There is No paragraf add")
        }

        return res.status(201).json(
            new ApiResponse(201,"Data send successfully",data)
        )
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal Server Error", error.message)
        );
    }
}

const sendaboutskill = async (req,res) => {
    try {
        console.log("Loading");
        
        const data = await aboutSkill.find();
        if (!data) {
            throw new ApiError(404,"There is no skill add")
        }

        return res.status(201).json(
            new ApiResponse(201,"Data send successfully",data)
        )
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal Server Error", error.message)
        );
    }
}

// const aboutParagraphAdd = async (req, res) => {
//     try {
//         const { detail } = req.body;
//         if (!detail) {
//             throw new ApiError(404, "detail is required");
//         }

//         let doc = await aboutParagraph.findOne({});

//         if (!doc) {
//             throw new ApiError(404,"Document not found")
//         }
       

//         if (doc) {
//             doc.Detail.push(detail);
//             await doc.save();
//         } else {
//             doc = await aboutParagraph.create({
//                 Detail: [detail]
//             });
//         }

//         return res.status(201).json(
//             new ApiResponse(201, "Detail added successfully", doc)
//         );

//     } catch (error) {
//         return res.status(500).json(
//             new ApiResponse(500, "Internal Server Error", error.message)
//         );
//     }
// };


const aboutParagraphAdd = async (req, res) => {
    try {
        const { detail } = req.body;
        if (!detail) {
            throw new ApiError(400, "detail is required"); // Use 400 for bad input
        }

        let doc = await aboutParagraph.findOne({});

        if (!doc) {
            // Create a new document with Detail array
            doc = await aboutParagraph.create({
                Detail: [detail]
            });
        } else {
            // Ensure Detail is an array
            if (!Array.isArray(doc.Detail)) {
                doc.Detail = [];
            }

            doc.Detail.push(detail);
            await doc.save();
        }

        return res.status(201).json(
            new ApiResponse(201, "Detail added successfully", doc)
        );

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal Server Error", error.message)
        );
    }
};

const skillAdd = async (req, res) => {
    try {
        const { icon, name } = req.body;

        if (!icon || !name) {
            throw new ApiError(404, "Icon and Name is required")
        }

        const checkdoc = await aboutSkill.findOne({name : name})

        if (checkdoc) {
            throw new ApiError(401,"This Skill is already in list")
        }
        
        const doc = await aboutSkill.create({
            icon : icon,
            name : name
        })

        if (!doc) {
            throw new ApiError(401,"Document error in create")
        }

        return res.status(201).json(
            new ApiResponse(201,"Skills added successfully",doc)
        )
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal Server Error", error.message)
        )
    }
}

const aboutParagraphLength = async (req,res) => {
    const data = await aboutParagraph.findOne()
    // console.log(data);
    
    return res.status(201).json(
        new ApiResponse(201,"That is total number of paragraph",data.Detail.length)
    )
}

export { aboutParagraphAdd, aboutParagraphLength, sendaboutdata ,skillAdd, sendaboutskill }