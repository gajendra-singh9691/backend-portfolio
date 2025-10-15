import { project } from "../Models/Project.model.js";
import ApiError from "../Utils/ApiError.js";
import ApiResponse from "../Utils/ApiResponse.js"
import uploadFile from "../Utils/cloudinary.js";



const projectImageUpdate = async (req, res) => {
    try {
        // console.log("Api is running");
        const { projectName } = req.body;
        

        if (!projectName) {
            throw new ApiError(404, "Project name must required for change image")
        }

        if (!req.file) {
            throw new ApiError(404,"No image found")
        }

        let projectImage = req.file.path;

        if (!projectImage) {
            throw new ApiError(404, "New image is required for change image")
        }

        projectImage = await uploadFile(projectImage)

        const updateded = await project.findOneAndUpdate(
            { projectName: { $regex: new RegExp(`^${projectName}$`, "i") } },
            { $set: { projectImage: projectImage.url } },
            { new: true }
        )

        if (!updateded) {
            throw new ApiError(404, `${projectName} is not in list`)
        }

        return res.status(201).json(
            new ApiResponse(201, `${projectName} image is changed successfully`, updateded)
        )

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal Server Error", error.message)
        )
    }
}

const projectNameChange = async (req, res) => {
    try {
        const { projectNewName, projectName } = req.body;
        if (!projectNewName) {
            throw new ApiError(404, "Project new name must required for change project name")
        }

        if (!projectName) {
            throw new ApiError(404, "old project name is required for change new project name")
        }

        const updatedDoc = await project.findOneAndUpdate(
            { projectName: { $regex: new RegExp(`^${projectName}$`, "i") } },
            { $set: { projectName: projectNewName } },
            { new: true }
        )

        if (!updatedDoc) {
            throw new ApiError(404, `${projectName} is not in list`)
        }

        res.status(201).json(
            new ApiResponse(201, `${projectName} change as ${projectNewName} successfully`)
        )

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal Server Error", error.message)
        )
    }
}

const projectDetailChange = async (req, res) => {
    try {
        const { projectName, projectDetail } = req.body;

        if (!projectName) {
            throw new ApiError(404, "Project name is required for change their detail")
        }

        if (!projectDetail) {
            throw new ApiError(404, "Project new detail is required for change")
        }

        const updatedDoc = await project.findOneAndUpdate(
            { projectName: { $regex: new RegExp(`^${projectName}$`, "i") } },
            { $set: { projectDetail: projectDetail } },
            { new: true }
        )

        if (!updatedDoc) {
            throw new ApiError(404, `${projectName} is not in list`)
        }

        return res.status(201).json(
            new ApiResponse(201, `${projectName} detail is updated`, updatedDoc)
        )
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal Server Error", error.message)
        )
    }
}

const projectGithubLinkChange = async (req,res) => {
    try {
        const { projectName, projectGithubLink } = req.body;

        if (!projectName) {
            throw new ApiError(404, "Project name is required for change their github link")
        }

        if (!projectGithubLink) {
            throw new ApiError(404, "Project github link is required for new link ")
        }
        
        const updatedDoc = await project.findOneAndUpdate(
            { projectName: { $regex: new RegExp(`^${projectName}$`, "i") } },
            { $set: { projectGithubLink: projectGithubLink } },
            { new: true }
        )

        if (!updatedDoc) {
            throw new ApiError(404, `${projectName} is not in list`)
        }

        return res.status(201).json(
            new ApiResponse(201, `${projectName} github link is updated`, updatedDoc)
        )

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal Server Error", error.message)
        )
    }
}

const projectDemoLinkChange = async (req,res) => {
    try {
        const { projectName, projectDemoLink } = req.body;

        if (!projectName) {
            throw new ApiError(404, "Project name is required for change their demo link")
        }

        if (!projectDemoLink) {
            throw new ApiError(404, "Project Demo link is required for new link ")
        }
        
        const updatedDoc = await project.findOneAndUpdate(
            { projectName: { $regex: new RegExp(`^${projectName}$`, "i") } },
            { $set: { projectDemoLink: projectDemoLink } },
            { new: true }
        )

        if (!updatedDoc) {
            throw new ApiError(404, `${projectName} is not in list`)
        }

        return res.status(201).json(
            new ApiResponse(201, `${projectName} demo link is updated`, updatedDoc)
        )

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal Server Error", error.message)
        )
    }
}

const projectUseAdd = async (req,res) => {
    try {
        const {projectName,projectNewUse} = req.body;

        if (!projectName) {
            throw new ApiError(404, "Project name is required for add new use")
        }

        if (!projectNewUse) {
            throw new ApiError(404,"Skill name must required for add on list")
        }

        const existingProject = await project.findOne({
            projectName: { $regex: new RegExp(`^${projectName}$`, "i") }
        });

        if (!existingProject) {
            throw new ApiError(404, "Project not found");
        }

        const alreadyExists = existingProject.projectUse.some(
            (use) => use.toLowerCase() === projectNewUse.toLowerCase()
        );

        if (alreadyExists) {
            throw new ApiError(400, `${projectNewUse} already exists in projectUse`);
        }

        const updatedDoc = await project.findOneAndUpdate(
            {projectName : { $regex: new RegExp(`^${projectName}$`, "i") } },
            { $push: { projectUse: projectNewUse } }, // add new item to array
            { new: true }
        )

        if (!updatedDoc) {
            throw new ApiError(404, "Project not found");
        }

        return res.status(200).json(
            new ApiResponse(200, `${projectNewUse} added successfully`, updatedDoc)
        );

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal Server Error", error.message)
        )
    }
}


const projectUseRemove = async (req, res) => {
    try {
        const { projectName, projectNewUse } = req.body;

        if (!projectName) {
            throw new ApiError(404, "Project name is required for removing use");
        }

        if (!projectNewUse) {
            throw new ApiError(404, "Skill name must be provided for removal");
        }

        const existingProject = await project.findOne({
            projectName: { $regex: new RegExp(`^${projectName}$`, "i") }
        });

        if (!existingProject) {
            throw new ApiError(404, "Project not found");
        }

        const skillExists = existingProject.projectUse.some(
            (use) => use.toLowerCase() === projectNewUse.toLowerCase()
        );

        if (!skillExists) {
            throw new ApiError(404, "This skill is not in the list");
        }

        const updatedDoc = await project.findOneAndUpdate(
            { projectName: { $regex: new RegExp(`^${projectName}$`, "i") } },
            { $pull: { projectUse: { $regex: new RegExp(`^${projectNewUse}$`, "i") } } },
            { new: true }
        );

        if (!updatedDoc) {
            throw new ApiError(404, "Project not found");
        }

        return res.status(200).json(
            new ApiResponse(200, "Use removed successfully", updatedDoc)
        );

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal Server Error", error.message)
        );
    }
};

const projectRemove = async (req,res) => {
    try {
        const {projectName} = req.params;
        
        if (!projectName) {
            throw new ApiError(404,"Project name is required for remove")
        }

        const removedata = await project.findOneAndDelete(
            { projectName: { $regex: new RegExp(`^${projectName}$`, "i") } },
        )

        if (!removedata) {
            throw new ApiError(404,`${projectName} is not exist`,removedata)
        }

        return res.status(200).json(
            new ApiResponse(200,`${projectName} project removed successfully`,removedata)
        )

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500,"Internal Server Error",error.message)
        )
    }
}


export { projectImageUpdate, projectNameChange, projectDetailChange, projectGithubLinkChange, projectDemoLinkChange,projectUseAdd, projectUseRemove,projectRemove}