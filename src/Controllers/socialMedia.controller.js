import { socialMedia } from "../Models/SocialMedia.model.js";
import ApiError from "../Utils/ApiError.js";
import ApiResponse from "../Utils/ApiResponse.js"

const sendLink = async (req,res) => {
    try {
        const data = await socialMedia.findOne({});
        if (!data) {
            throw new ApiError(404,"Data not found")
        }

        return res.status(201).json(
            new ApiResponse(201,"Data sended successfully",data)
        )

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal server error", error.message)
        )
    }
}

const addAllSocialMedia = async (req, res) => {
    try {
        const { instagram, linkdin, github } = req.body;

        if (!instagram) {
            throw new ApiError(404, "Instagram account link is required")
        }

        if (!linkdin) {
            throw new ApiError(404, "Linkdin account link is required")
        }

        if (!github) {
            throw new ApiError(404, "Github account link is required")
        }

        const existing = await socialMedia.findOne({})

        if (existing) {
            await socialMedia.deleteMany({})
        }

        const doc = socialMedia.create({
            instagram: instagram,
            linkdin: linkdin,
            github: github
        })

        if (!doc) {
            throw new ApiError(401, "Links not added in database")
        }

        return res.status(201).json(
            new ApiResponse(201, "All social media links added successfully", doc)
        )

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal server error", error.message)
        )
    }
}

const removeAllSocialMedia = async (req, res) => {
    try {
        const doc = await socialMedia.findOne({})
    
        if (!doc) {
            throw new ApiError(404, "There is no link find so nothing delete")
        }
    
        doc.instagram = "";
        doc.linkdin = "";
        doc.github = "";
    
        doc.save()
    
        return res.status(201).json(
            new ApiResponse(201, "All social media link remove successfully", doc)
        )
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal server error", error.message)
        )
    }
}

const removeInstagramLink = async (req,res) => {
    try {

        const doc = await socialMedia.findOne({})

        if (!doc) {
            throw new ApiResponse(404,"There is zero link on database")
        }

        doc.instagram = "";

        doc.save()

        res.status(201).json(
            new ApiResponse(201,"Instagram link is removed successfully",doc)
        )

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal server error", error.message)
        )
    }
}

const removeLinkdinLink = async (req,res) => {
    try {

        const doc = await socialMedia.findOne({})

        if (!doc) {
            throw new ApiResponse(404,"There is zero link on database")
        }

        doc.linkdin = "";

        doc.save()

        res.status(201).json(
            new ApiResponse(201,"Instagram link is removed successfully",doc)
        )

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal server error", error.message)
        )
    }
}

const removeGithubLink = async (req,res) => {
    try {

        const doc = await socialMedia.findOne({})

        if (!doc) {
            throw new ApiResponse(404,"There is zero link on database")
        }

        doc.github = "";

        doc.save()

        res.status(201).json(
            new ApiResponse(201,"Github link is removed successfully",doc)
        )

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal server error", error.message)
        )
    }
}




const updateInstagramLink = async (req, res) => {
    try {
        const { instagram } = req.body;

        if (!instagram) {
            throw new ApiError(404, "Instagram link is required for update")
        }

        const doc = await socialMedia.findOne({})

        if (!doc) {
            const newDoc = socialMedia.create({
                instagram: instagram,
                linkdin: "",
                github: "",
            })
            if (!newDoc) {
                throw new ApiError(401, "Links not added in database")
            }

            return res.status(201).json(
                new ApiResponse(201, "Your instagram link is added", newDoc)
            )
        }
        else {
            doc.instagram = instagram;
            doc.save()
            return res.status(201).json(
                new ApiResponse(201,"Your instagram link is updated",doc)
            )
        }
    } catch (error) {
        new ApiResponse(500, "Internal server error", error.message)
    }
}

const updateLinkdinLink = async (req, res) => {
    try {
        const { linkdin } = req.body;

        if (!linkdin) {
            throw new ApiError(404, "linkdin link is required for update")
        }

        const doc = await socialMedia.findOne({})

        if (!doc) {
            const newDoc = socialMedia.create({
                instagram: "",
                linkdin: linkdin,
                github: "",
            })
            if (!newDoc) {
                throw new ApiError(401, "Links not added in database")
            }

            return res.status(201).json(
                new ApiResponse(201, "Your linkdin link is added", newDoc)
            )
        }
        else {
            doc.linkdin = linkdin;
            doc.save()
            return res.status(201).json(
                new ApiResponse(201,"Your Linkdin link is updated",doc)
            )
        }
    } catch (error) {
        new ApiResponse(500, "Internal server error", error.message)
    }
}

const updateGithubLink = async (req, res) => {
    try {
        const { github } = req.body;

        if (!github) {
            throw new ApiError(404, "Github link is required for update")
        }

        const doc = await socialMedia.findOne({})

        if (!doc) {
            const newDoc = socialMedia.create({
                instagram: "",
                linkdin: "",
                github: github,
            })
            if (!newDoc) {
                throw new ApiError(401, "Links not added in database")
            }

            return res.status(201).json(
                new ApiResponse(201, "Your github link is added", newDoc)
            )
        }
        else {
            doc.github = github;
            doc.save()
            return res.status(201).json(
                new ApiResponse(201,"Your Github link is updated",doc)
            )
        }
    } catch (error) {
        new ApiResponse(500, "Internal server error", error.message)
    }
}

export { addAllSocialMedia, removeAllSocialMedia,removeInstagramLink,removeLinkdinLink, removeGithubLink, updateInstagramLink, updateLinkdinLink, updateGithubLink,sendLink }