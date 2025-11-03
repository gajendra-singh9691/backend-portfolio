import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})
const uploadFile = async (fileLocalPath) => {
  try {
    // console.log(cloud_name);
    console.log("Cloudinary Config:", cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
}));
    if (!fileLocalPath) return null;
    console.log(process.env.CLOUDINARY_CLOUD_NAME);
    console.log(process.env.CLOUDINARY_API_KEY);
    console.log(process.env.CLOUDINARY_API_SECRET);
    
    console.log("Going on uploadFile");
    
    const response = await cloudinary.uploader.upload(fileLocalPath, {
      resource_type: "auto",
    });
    console.log("Response time");
    console.log(response);


    fs.unlinkSync(fileLocalPath);
    return response
  } catch (error) {
    console.log(error);

    fs.unlinkSync(fileLocalPath);
    return null;
  }
}

export default uploadFile;