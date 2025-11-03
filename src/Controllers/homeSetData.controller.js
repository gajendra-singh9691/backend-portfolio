import { home } from "../Models/Home.model.js";
import ApiError from "../Utils/ApiError.js";
import ApiResponse from "../Utils/ApiResponse.js";
import uploadFile from "../Utils/cloudinary.js";

const setData = async (req, res) => {
    try {
        const { name, titles, detail } = req.body;
        if (!req.file) {
            throw new ApiError(404, "Image is required")
        }
        if (!name && !titles && !detail) {
            throw new ApiError(404, "name, titles or detail are required")
        }

        let profileImage = req.file.path;
        console.log(profileImage);
        
        if (!profileImage) {
            console.log("Going");
            
            throw new ApiError(404, "Image not found")
        }

        profileImage = await uploadFile(profileImage)

        if (!profileImage) {
            throw new ApiError(500, "Image not upload")
        }

        await home.deleteMany({});

        const homes = await home.create({
            name: name,
            titles: titles,
            detail: detail,
            image: profileImage.url
        })

        return res.status(201).json(
            new ApiResponse(201, "Home data set successfully", homes)
        )
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal Server Error", error.message)
        );
    }
}


const sendDataHome = async (req, res) => {
    try {
        const data = await home.findOne()

        if (!data) {
            throw new ApiError(404, "Home data document not found")
        }

        return res.status(201).json(
            new ApiResponse(201, "Home data send successfully", data)
        )
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal Server Error", error.message)
        );
    }
}

export { setData, sendDataHome }