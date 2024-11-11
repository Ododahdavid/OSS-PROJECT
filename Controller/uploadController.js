    // utils/imageUpload.js
    const fs = require("fs");
    const AppError = require("../utils/appError");
    const cloudinary = require("cloudinary").v2;

    exports.uploadImageToCloudinary = async (file) => {
    // Validate file type and size
    if (!file.mimetype.startsWith("image")) {
        throw new AppError("Please upload an image file", 400);
    }

    const maxSize = 1024 * 1024 * 5; // 5 MB
    if (file.size > maxSize) {
        throw new AppError("Image size should be less than 5MB", 400);
    }

    try {
        // Upload the image to Cloudinary
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
        use_filename: true,
        folder: "file-upload",
        });

        // Remove the temporary file from the server
        fs.unlinkSync(file.tempFilePath);

        return { url: result.secure_url, public_id: result.public_id };
    } catch (error) {
        console.error("Cloudinary Upload Error:", error); // Log specific Cloudinary error
        throw new AppError("Cloudinary Upload Failed", 500);
    }
    };
