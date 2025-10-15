import mongoose from "mongoose";
  
const serviceSchema = new mongoose.Schema({
    serviceName: {
        type: String,
        required: true,
    },
    best_for: {
        type: String,
        required: true
    },
    Work_list: {
        type: [
            {
                type: String,
                required: true,
            }
        ]
    },
    price: {
        USD: {
            type: String
        },
        INR: {
            type: String
        }
    },
    timeline: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    }
}
)

export const service = mongoose.model('service', serviceSchema);