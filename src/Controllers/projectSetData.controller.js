import { project } from "../Models/Project.model.js";
import ApiError from "../Utils/ApiError.js";
import ApiResponse from "../Utils/ApiResponse.js"
import uploadFile from "../Utils/cloudinary.js";

const sendprojectDetail = async (req,res) => {
    try {
        const data = await project.find()

        if (!data) {
            throw new ApiError(404,"No project found")
        }

        return res.status(201).json(
            new ApiResponse(201,"Data sended successfully",data)
        )
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal Server Error", error.message)
        )
    }
}

const addNewProject = async (req, res) => {
    try {
        const { projectName, projectDetail, projectUse, projectGithubLink, projectDemoLink } = req.body;

        if (!projectName) {
            throw new ApiError(404, "Project Name is required")
        }

        if (!projectDetail) {
            throw new ApiError(404, "Project detail is required")
        }

        if (projectUse.length <= 0) {
            throw new ApiError(404, "Project use skills must required")
        }

        if (!projectGithubLink) {
            throw new ApiError(404, "project github link is required")
        }

        if (!projectDemoLink) {
            throw new ApiError(404, "Project demo link is required")
        }

        const existeProject = await project.findOne({
            projectName: { $regex: new RegExp(`^${projectName}$`, "i") }
        })

        if (existeProject) {
            throw new ApiError(401, `${projectName} is already exisist`)
        }

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        let projectImage = req.file?.path;
        console.log(projectImage);


        if (!projectImage) {
            throw new ApiError(404, "Project Image must required")
        }

        projectImage = await uploadFile(projectImage)

        if (!projectImage) {
            throw new ApiError(500, "Image not upload")
        }

        const newProject = await project.create({
            projectName: projectName,
            projectImage: projectImage.url,
            projectDetail: projectDetail,
            projectUse: projectUse,
            projectGithubLink: projectGithubLink,
            projectDemoLink: projectDemoLink
        })

        return res.status(201).json(
            new ApiResponse(201, `${projectName} add successfully`, newProject)
        )

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal Server Error", error.message)
        )
    }
}

export { addNewProject , sendprojectDetail }