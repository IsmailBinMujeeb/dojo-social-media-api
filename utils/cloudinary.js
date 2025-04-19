import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import { config } from "dotenv";
config();

cloudinary.config({

    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export default async (filePath) => {

    if (!filePath) {
        return null;
    }

    const result = await cloudinary.uploader.upload(filePath, {
        folder: 'images',
        resource_type: 'auto'
    });

    fs.unlinkSync(filePath); // Delete the file from the local system after uploading to Cloudinary

    return result.secure_url;
}