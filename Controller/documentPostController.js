const Document = require('../Model/documentModel');
const catchAsync = require('../utils/catchAsync');
const { StatusCodes } = require('http-status-codes');

// 1. Create a New Document
exports.createDocument = catchAsync(async (req, res) => {
    const { title, author, project, isDraft } = req.body;

    const document = await Document.create({
        title,
        author,
        project,
        isDraft
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

    const documents = await Document.find({ project: projectId });

    res.status(StatusCodes.OK).json({
        status: 'success',
        results: documents.length,
        data: {
            documents
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
        new: true, // Return the updated document
        runValidators: true // Validate the updated fields
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

    const document = await Document.findByIdAndDelete(id);

    if (!document) {
        return res.status(StatusCodes.NOT_FOUND).json({
            status: 'error',
            message: 'No document found with that ID'
        });
    }

    res.status(StatusCodes.NO_CONTENT).json({
        status: 'success',
        data: null
    });
});
