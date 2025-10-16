// import { home } from "../Models/home.models.js";
import { home } from "../Models/Home.model.js";
import ApiError from "../Utils/ApiError.js"
import ApiResponse from "../Utils/ApiResponse.js";
import uploadFile from "../Utils/cloudinary.js";

const changeImage = async (req, res) => {
    try {
        let image = req.file.path;
        if (!image) {
            throw new ApiError(404, "Image not found");
        }
        image = await uploadFile(image);

        if (!image || !image.url) {
            throw new ApiError(404, "Uploaded Image not found");
        }
        const updatedDoc = await home.findOneAndUpdate(
            {},
            { image: image.url },
        );
        if (!updatedDoc) {
            throw new ApiError(404, "Old Document not found of Home page");
        }
        return res.status(201).json(
            new ApiResponse(201, "Profile image changed successfully", updatedDoc)
        )

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal Server Error", error.message)
        );
    }
}

const changeName = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            throw new ApiError(404, "Name is required")
        }

        const updatedDoc = await home.findOneAndUpdate(
            {},
            { name: name },
            { new: true }
        );

        if (!updatedDoc) {
            throw new ApiError(404, "Old Document not found of Home page");
        }

        return res.status(201).json(
            new ApiResponse(201, "Name changed successfully", updatedDoc)
        )

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal Server Error", error.message)
        );
    }
}

// const changeSkills = async (req, res) => {
//     try {
//         const { titles } = req.body;
//         if (!titles) {
//             throw new ApiError(404, "Skills is required")
//         }

//         const updatedDoc = await home.findOneAndUpdate(
//             {},
//             { titles: titles },
//             { new: true }
//         );

//         if (!updatedDoc) {
//             throw new ApiError(404, "Document not found");
//         }

//         return res.status(201).json(
//             new ApiResponse(201, "Skills list changed successfully", updatedDoc)
//         )
//     } catch (error) {
//         return res.status(500).json(
//             new ApiResponse(500, "Internal Server Error", error.message)
//         );
//     }
// }


const AddSkills = async (req, res) => {
    try {
        const { titles } = req.body;
        if (!titles) {
            throw new ApiError(404, "Skills must required");
        }

        const updatedDoc = await home.findOne();
        if (!updatedDoc) {
            throw new ApiError("Document not found in database")
        }
        updatedDoc.titles = [...updatedDoc.titles, ...titles]

        await updatedDoc.save();


        res.status(201).json(
            new ApiResponse(201, "Skills added successfully", updatedDoc)
        )

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal Server Error", error.message)
        );
    }
}

const changedetail = async (req, res) => {
    try {
        const { detail } = req.body;
        console.log(detail);
        if (!detail) {
            throw new ApiError(404, "Detail is required");
        }

        const updatedDoc = await home.findOneAndUpdate(
            {},
            { detail: detail },
            { new: true }
        );

        if (!updatedDoc) {
            throw new ApiError(505, "Detail not change server error")
        }

        return res.status(201).json(
            new ApiResponse(201, "Detail changed successfully", updatedDoc)
        )
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal Server Error", error.message)
        );
    }
}

const removeSkill = async (req, res) => {
    try {
        const { skill } = req.body;

        if (!skill) {
            throw new ApiError(404, "Skill name must required for remove");
        }

        const doc = await home.findOne();

        if (!doc) {
            throw new ApiError(404, "Home document not found")
        }

         const exists = doc.titles.some(
            (item) => item.toLowerCase() === skill.toLowerCase()
        );

        
        if (!exists) {
            // new ApiResponse(201,`${skill} is not in list`,doc)
            // console.log("Going in throw if");
            throw new ApiError(404,`${skill} is not in list`)
        }

        doc.titles = doc.titles.filter((item) => item.toLowerCase() !== skill.toLowerCase())
        
        await doc.save();

        return res.status(201).json(
            new ApiResponse(201,`${skill} is removed successfully`,doc)
        )

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal Server Error", error.message)
        );
    }
}

export default changeImage
export { changeName, AddSkills, changedetail ,removeSkill}