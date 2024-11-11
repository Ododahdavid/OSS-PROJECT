    const Document = require('../Model/documentModel');
    const catchAsync = require('../utils/catchAsync');
    const { StatusCodes } = require('http-status-codes');
    const {imageUpload}=require('../Controller/uploadController');
    const cloudinary=require('cloudinary').v2
    const multer=require('multer')
    const fs=require('fs')
    const path=require('path')
    const AppError=require('../utils/appError')
    // Helper function to create default document
    exports.createDefaultDocument = catchAsync(async (userId, projectId) => {
        const defaultDocument = await Document.create({
            title: 'Untitled',
            author: userId,
            project: projectId,
            isDraft: true,
            content: [  
                {
                    type: 'p',  // This matches the enum values in the schema (e.g., 'p' for paragraph)
                    content: 'Welcome to your first document!'  // This matches the required 'content' field
                }
            ]
        });
        return defaultDocument;
    });


    // 1. Create a New Document
        

        exports.createDocument = catchAsync(async (req, res, next) => {
            const { title, content, author, project, uploadType } = req.body;
            
            // Parse and sanitize inputs
            const parsedIsDraft = req.body.isDraft ? req.body.isDraft.toString().trim().toLowerCase() === 'true' : true; // Default to true
            const cleanAuthor = author ? author.trim() : null;
            const cleanProject = project ? project.trim() : null;
        
            let documentData = {
            title,
            content,
            author: cleanAuthor,
            project: cleanProject,
            isDraft: parsedIsDraft,
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
        
                documentData.image = { src: `/uploads/${imageFile.name}` };
                console.log("Local upload successful:", documentData.image);
        
            } else if (uploadType === 'cloudinary') {
                try {
                const uploadResult = await cloudinary.uploader.upload(imageFile.tempFilePath, {
                    use_filename: true,
                    folder: 'file-upload',
                });
        
                fs.unlinkSync(imageFile.tempFilePath);
                documentData.image = {
                    src: uploadResult.secure_url,
                    public_id: uploadResult.public_id,
                };
                console.log("Cloudinary upload successful:", documentData.image);
        
                } catch (error) {
                console.error('Cloudinary upload error:', error);
                return next(new AppError('Cloudinary upload failed', 500));
                }
            } else {
                return next(new AppError('Invalid upload type', 400));
            }
            }
        
            console.log("Document data before saving:", documentData);
        
            // Save document to the database
            const document = await Document.create(documentData);
        
            res.status(201).json({
            status: 'success',
            data: {
                document,
            },
            });
        });
    // 2. Get All Documents for a Project
    exports.getAllDocuments = catchAsync(async (req, res) => {
        const { projectId } = req.params;
        const { userId } = req.user; // Assuming you have user info in request

        // Check if user has any documents in this project
        const userDocuments = await Document.find({ 
            project: projectId,
            author: userId 
        });

        // If user has no documents, create a default one
        if (userDocuments.length === 0) {
            const defaultDocument = await exports.createDefaultDocument(userId, projectId);
            userDocuments.push(defaultDocument);
        }

        res.status(StatusCodes.OK).json({
            status: 'success',
            results: userDocuments.length,
            data: {
                documents: userDocuments
            }
        });
    });

    // 3. Get a Single Document by ID
    exports.getDocument = catchAsync(async (req, res) => {
        const { id } = req.params;

        const document = await Document.findById(id).populate('author').populate('project');

        if (!document) {
            return res.status(StatusCodes.NOT_FOUND).json({
                status: 'error',
                message: 'No document found with that ID'
            });
        }

        res.status(StatusCodes.OK).json({
            status: 'success',
            data: {
                document
            }
        });
    });

    // 4. Update Document
    exports.updateDocument = catchAsync(async (req, res) => {
        const { id } = req.params;

        const document = await Document.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!document) {
            return res.status(StatusCodes.NOT_FOUND).json({
                status: 'error',
                message: 'No document found with that ID'
            });
        }

        res.status(StatusCodes.OK).json({
            status: 'success',
            data: {
                document
            }
        });
    });

    // 5. Delete Document
    exports.deleteDocument = catchAsync(async (req, res) => {
        const { id } = req.params;
        const { userId } = req.user; // Assuming you have user info in request

        const document = await Document.findByIdAndDelete(id);

        if (!document) {
            return res.status(StatusCodes.NOT_FOUND).json({
                status: 'error',
                message: 'No document found with that ID'
            });
        }

        // Check if this was the user's last document in the project
        const remainingDocuments = await Document.find({
            project: document.project,
            author: userId
        });

        // If no documents left, create a new default document
        if (remainingDocuments.length === 0) {
            await exports.createDefaultDocument(userId, document.project);
        }

        res.status(StatusCodes.NO_CONTENT).json({
            status: 'success',
            data: null
        });
    });