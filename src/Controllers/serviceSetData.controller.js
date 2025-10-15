import { service } from "../Models/Service.model.js";
import ApiError from "../Utils/ApiError.js"
import ApiResponse from "../Utils/ApiResponse.js"

const sendServiceData = async (req,res) => {
    try {
        const data = await service.find()
        if (!data) {
            throw new ApiError(404,"No Service found")
        }

        return res.status(201).json(
            new ApiResponse(201,"Data Send Successfully",data)
        )

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500,"Internal Server Error",error.message)
        )
    }
}

const addNewService = async (req,res) => {
    try {
        const {serviceName,best_for,Work_list,price,timeline,note} = req.body;
        console.log(req.body);
        

        if (!serviceName || !best_for || !Work_list || !timeline || !note) {
            throw new ApiError(404,"All field must required")
        }

        const existingService = await service.findOne({
            serviceName: { $regex: new RegExp(`^${serviceName}$`, "i") }
        });

        if (existingService) {
            return res.status(400).json(
                new ApiResponse(400, "This service already exists")
            );
        }

        const newService = service.create({
            serviceName : serviceName,
            best_for : best_for,
            Work_list : Work_list,
            price : price,
            timeline : timeline,
            note : note
        })

        return res.status(201).json(
            new ApiResponse(201,"New Service added successfully",newService)
        )

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500,"Internal Server Error",error.message)
        )
    }
}


export {addNewService,sendServiceData}