import mongoose from "mongoose";
import { contact } from "../Models/Contact.model.js";
import ApiError from "../Utils/ApiError.js"
import ApiResponse from "../Utils/ApiResponse.js";
import nodemailer from "nodemailer"

const newInquiry = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name) {
            throw new ApiError(404, "Name is required for contact")
        }

        if (!email) {
            throw new ApiError(404, "Email is required for contact")
        }

        if (!message) {
            throw new ApiError(404, "Message is required for contact")
        }

        const existingInquiry = await contact.findOne({ email: { $regex: new RegExp(`^${email}$`, "i") } });

        if (existingInquiry) {
            throw new ApiError(400, "Your message is already in the list");
        }

        const doc = await contact.create({
            name: name,
            email: email,
            message: message
        })

        if (!doc) {
            throw new ApiError(404, "Message not shared")
        }

        return res.status(201).json(
            new ApiResponse(201, "Message is shared successfully")
        )
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, 'Internal Server Error', error.message)
        )
    }
}

const removeInquray = async (req, res) => {
    try {
        const { id } = req.body;
        console.log(id);
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ApiError(401, "Invaild ID format")
        }

        const deletedDoc = await contact.findByIdAndDelete(id);

        if (!deletedDoc) {
            throw new ApiError(404, "This document is not in database")
        }

        return res.status(201).json(
            new ApiResponse(201, "Data remove successfully")
        )

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal Server Error", error.message)
        )
    }
}

const removeAllInquries = async (req, res) => {
    try {
        const result = await contact.deleteMany({}); // deletes all documents

        if (result.deletedCount === 0) {
            throw new ApiError(404, "No documents found in collection");
        }

        return res.status(200).json(
            new ApiResponse(200, "All documents removed successfully", {
                deletedCount: result.deletedCount
            })
        );

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal Server Error", error.message)
        );
    }
};

const sendMail = async (req, res) => {
    try {
        const { to, subject, message } = req.body;

        if (!to || !subject || !message) {
            return new ApiError(400, "All fields are required")
        }

        const trasnporter = nodemailer.createTransport({
            service : "gmail",
            auth : {
                user : process.env.EMAIL_USER,
                pass : process.env.EMAIL_PASS,
            }
        })

        const mailOptions = {
            from : process.env.EMAIL_USER,
            to,
            subject,
            text : message
        }

        await trasnporter.sendMail(mailOptions);
    
        return res.status(201).json(new ApiResponse(201,`Mail is sended successfuly to ${to}`))

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal Server Error", error.message)
        );
    }
}

const sendData = async (req,res) => {
    try {
        const data = await contact.find({});
        if (!data) {
            throw new ApiError(404,"Data not found")
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

export { newInquiry, removeInquray, removeAllInquries, sendMail, sendData }