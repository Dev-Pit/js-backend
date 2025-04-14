import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config(
  {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
  // console.log("[DEBUG] Cloudinary Config:", {
  //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  //   api_key: process.env.CLOUDINARY_API_KEY?.slice(0, 3) + "***", // Partial logging for security
  //   api_secret: process.env.CLOUDINARY_API_SECRET?.slice(0, 3) + "***",
  // })
);

const uploadOnCloudinary = async (localFilePath) => {
  // console.log(`\n upload on cloudinary called. ${localFilePath}`);
  try {
    if (!localFilePath) {
      return null;
    } else {
      //   upload file in cloudinary
      console.log(`\n uploading to cloudinary...`);
      const uploadResult = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto",
      });
      //   file has been uploaded successfully.
      // console.log(`file is uploaded in cloudinary: ${uploadResult.url}`);
      fs.unlinkSync(localFilePath);
      return uploadResult;
    }
  } catch (error) {
    // console.log(`\n failed to upload image on cloudinary... ${error}`);
    fs.unlinkSync(localFilePath); //remove the locally saved temporary file as upload operation got failed
    return null;
  }
};

export { uploadOnCloudinary };
