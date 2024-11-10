const Document = require('../Model/documentModel');
const catchAsync = require('../utils/catchAsync');
const { StatusCodes } = require('http-status-codes');

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
exports.createDocument = catchAsync(async (req, res) => {
    const { title, author, project, isDraft, content } = req.body;

    const document = await Document.create({
        title,
        author,
        project,
        isDraft,
        content
    });

    res.status(StatusCodes.CREATED).json({
        status: 'success',
        data: {
            document
        }
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