import imageCompression from "browser-image-compression";
import { v4 as uuidv4 } from "uuid";

export const uploadImageToCloudinary = async (file, folder = "uploads") => {
    try {
        // Compress image
        const options = {
            maxSizeMB: 0.6,        // ~200 KB
            maxWidthOrHeight: 720, // resize to 720px
            useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);

        // Prepare form data for Cloudinary
        const data = new FormData();
        data.append("file", compressedFile);
        data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET); // unsigned preset
        data.append("folder", folder); // optional folder inside cloudinary

        // Upload
        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD}/image/upload`,
            {
                method: "POST",
                body: data,
            }
        );

        const result = await res.json();
        if (result.secure_url) {
            return result.secure_url;
        } else {
            throw new Error(result.error?.message || "Upload failed");
        }
    } catch (error) {
        console.error("Error uploading image:", error);
        throw new Error("Could not upload the image. Please try again.");
    }
};
