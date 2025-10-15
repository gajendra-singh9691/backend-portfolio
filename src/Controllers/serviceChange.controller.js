import { service } from "../Models/Service.model.js";
import ApiError from "../Utils/ApiError.js";
import ApiResponse from "../Utils/ApiResponse.js"


const removeService = async (req, res) => {
    try {
        const { serviceName } = req.body;

        if (!serviceName) {
            throw ApiError(404, "Service name is must required")
        }

        const deleteDoc = await service.findOneAndDelete({
            serviceName: { $regex: new RegExp(`^${serviceName}$`, "i") }
        })

        if (!deleteDoc) {
            throw new ApiError(404, "this service not found")
        }

        res.status(201).json(
            new ApiResponse(201, "This is service removed successfully")
        )
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal server error", error.message)
        )
    }
}

const addList = async (req, res) => {
    try {
        const { serviceName, newList } = req.body;

        if (!serviceName) {
            throw new ApiError(404, "service Name must required")
        }

        if (!newList) {
            throw new ApiError(404, "New item of list is required")
        }

        const updatedService = await service.findOneAndUpdate(
            { serviceName: { $regex: new RegExp(`^${serviceName}$`, "i") } },
            { $addToSet: { Work_list: newList } },
            { new: true }
        );

        if (!updatedService) {
            throw new ApiError(404, "Project heading not found");
        }

        return res.status(200).json(
            new ApiResponse(200, "New list item added successfully", updatedService)
        );

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal Server Error", error.message)
        )
    }
}

const removeList = async (req, res) => {
    try {
        const { serviceName, listItem } = req.body;

        if (!serviceName) {
            throw new ApiError(404, "serviceName is required");
        }

        if (!listItem) {
            throw new ApiError(404, "List item to remove is required");
        }

        const updatedService = await service.findOneAndUpdate(
            { serviceName: { $regex: new RegExp(`^${serviceName}$`, "i") } },
            { $pull: { Work_list: listItem } },
            { new: true }
        );

        if (!updatedService) {
            throw new ApiError(404, "Project heading not found");
        }

        return res.status(200).json(
            new ApiResponse(200, "List item removed successfully", updatedService)
        );

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal Server Error", error.message)
        );
    }
};


const changePrice = async (req, res) => {
    try {
        const { price, serviceName, priceType } = req.body;

        if (!price) {
            throw new ApiError(404, "New price is required")
        }

        if (!serviceName) {
            throw new ApiError(404, "Service name must required for change price")
        }

        if (!priceType || !["USD", "INR"].includes(priceType)) {
            throw new ApiError(404, "Price type is required and must be either 'USD' or 'INR'");
        }

        const updatedService = await service.findOneAndUpdate(
            { serviceName : { $regex: new RegExp(`^${serviceName}$`, "i") } },
            { $set: { [`price.${priceType}`]: price } },
            { new: true }
        );

        if (!updatedService) {
            throw new ApiError(404, "Service not found");
        }

        return res.status(200).json(
            new ApiResponse(200, `${updatedService.serviceName} ${priceType} price updated successfully`, updatedService)
        );

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal Server Error", error.message)
        )
    }
}

const changeBestFor = async (req, res) => {
    try {

        const { serviceName, newBest } = req.body;

        if (!serviceName) {
            throw new ApiError(404, "Service name must required for change Best")
        }

        if (!newBest) {
            throw new ApiError(404, "'Best for' must required for change it")
        }

        const updatedService = await service.findOneAndUpdate(
            { serviceName: { $regex: new RegExp(`^${serviceName}$`, "i") } },
            { $set: { best_for: newBest } },
            { new: true }
        )

        if (!updatedService) {
            throw new ApiError(404, "Service not found");
        }

        return res.status(201).json(
            new ApiResponse(201,`${updatedService.serviceName} 'best for' change successfully`,updatedService)
        )
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal Server Error", error.message)
        )
    }
}

const changeTimeline = async (req, res) => {
    try {

        const { serviceName, newTimeline } = req.body;

        if (!serviceName) {
            throw new ApiError(404, "Service name must required for change Best")
        }

        if (!newTimeline) {
            throw new ApiError(404, "'Time line' must required for change it")
        }

        const updatedService = await service.findOneAndUpdate(
            { serviceName: { $regex: new RegExp(`^${serviceName}$`, "i") } },
            { $set: { timeline : newTimeline } },
            { new: true }
        )

        if (!updatedService) {
            throw new ApiError(404, "Service not found");
        }

        return res.status(201).json(
            new ApiResponse(201,`${updatedService.serviceName} 'timeline' change successfully`,updatedService)
        )
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal Server Error", error.message)
        )
    }
}

const changeNote = async (req, res) => {
    try {

        const { serviceName, newNote } = req.body;

        if (!serviceName) {
            throw new ApiError(404, "Service name must required for change Best")
        }

        if (!newNote) {
            throw new ApiError(404, "'Note' must required for change it")
        }

        const updatedService = await service.findOneAndUpdate(
            { serviceName: { $regex: new RegExp(`^${serviceName}$`, "i") } },
            { $set: { note : newNote } },
            { new: true }
        )

        if (!updatedService) {
            throw new ApiError(404, "Service not found");
        }

        return res.status(201).json(
            new ApiResponse(201,`${updatedService.serviceName} 'note' change successfully`,updatedService)
        )
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal Server Error", error.message)
        )
    }
}

export { addList, removeList, removeService, changePrice, changeBestFor, changeTimeline, changeNote }