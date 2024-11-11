    const Page = require('../Model/pageModel');
    const { StatusCodes } = require('http-status-codes');
    const catchAsync = require('../utils/catchAsync');
    const AppError=require('../utils/appError');
    const cloudinary=require('cloudinary').v2
    
    const multer=require('multer')
    const fs=require('fs')
    const path=require('path')
        // Create a new page
    exports.createPage = catchAsync(async (req, res, next) => {
    const { title, content, document, author, uploadType } = req.body;

    // Clean up the document and author IDs to avoid trailing spaces or commas
    const cleanDocument = document ? document.trim().replace(/,$/, '') : null;
    const cleanAuthor = author ? author.trim().replace(/,$/, '') : null;

    let pageData = {
        title,
        content,
        document: cleanDocument,
        author: cleanAuthor,
    };

    // Image upload handling
    if (req.files && req.files.image) {
        const imageFile = req.files.image;

        // Validate the image file
        if (!imageFile.mimetype.startsWith('image')) {
        return next(new AppError('Please upload an image file', 400));
        }
        const maxSize = 5 * 1024 * 1024; // 5 MB
        if (imageFile.size > maxSize) {
        return next(new AppError('Image size should be less than 5MB', 400));
        }

        // Handle image upload based on the type
        if (uploadType === 'local') {
        const imagePath = path.join(__dirname, './../public/uploads/', imageFile.name);
        await imageFile.mv(imagePath); // Move file to the uploads directory

        pageData.image = { src: `/uploads/${imageFile.name}` };
        console.log("Local upload successful:", pageData.image);

        } else if (uploadType === 'cloudinary') {
        try {
            const uploadResult = await cloudinary.uploader.upload(imageFile.tempFilePath, {
            use_filename: true,
            folder: 'page-images',
            });

            fs.unlinkSync(imageFile.tempFilePath);
            pageData.image = {
            src: uploadResult.secure_url,
            public_id: uploadResult.public_id,
            };
            console.log("Cloudinary upload successful:", pageData.image);

        } catch (error) {
            console.error('Cloudinary upload error:', error);
            return next(new AppError('Cloudinary upload failed', 500));
        }
        } else {
        return next(new AppError('Invalid upload type', 400));
        }
    }

    console.log("Page data before saving:", pageData);

    // Save page to the database
    const newPage = await Page.create(pageData);

    res.status(201).json({
        status: 'success',
        data: {
        newPage,
        },
    });
    });
    // Get all pages
    exports.getAllPages = catchAsync(async (req, res, next) => {
        const pages = await Page.find();
        res.status(StatusCodes.OK).json({ status: 'success', data: pages });
    });

    // Get all pages for a specific document
    exports.getAllPagesByDocument = catchAsync(async (req, res, next) => {
        const { documentId } = req.params;

        const pages = await Page.find({ document: documentId });

        res.status(StatusCodes.OK).json({
            status: 'success',
            data: pages
        });
    });

    // Get a single page by ID
    exports.getPage = catchAsync(async (req, res, next) => {
        const { id } = req.params;

        const page = await Page.findById(id).populate('author document');

        if (!page) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Page not found' });
        }

        res.status(StatusCodes.OK).json({
            status: 'success',
            data: page
        });
    });

    // Update a page by ID
    exports.updatePage = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const { title, content, updatedBy } = req.body; // Ensure updatedBy is included
    
        const updatedPage = await Page.findOneAndUpdate(
            { _id: id },
            { title, content, updatedBy },
            { new: true, runValidators: true }
        );
    
        if (!updatedPage) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Page not found' });
        }
    
        res.status(StatusCodes.OK).json({
            status: 'success',
            data: updatedPage
        });
    });
    

    // Delete a page by ID
    exports.deletePage = catchAsync(async (req, res, next) => {
        const { id } = req.params;

        const page = await Page.findByIdAndDelete(id);

        if (!page) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Page not found' });
        }

        res.status(StatusCodes.NO_CONTENT).json({ status: 'success' });
    });
