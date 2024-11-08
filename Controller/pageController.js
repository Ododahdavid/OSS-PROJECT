    const Page = require('../Model/pageModel');
    const { StatusCodes } = require('http-status-codes');
    const catchAsync = require('../utils/catchAsync');

    // Create a new page
    exports.createPage = catchAsync(async (req, res, next) => {
        const { title, content, document, author } = req.body;

        const newPage = await Page.create({
            title,
            content,
            document,
            author
        });

        res.status(StatusCodes.CREATED).json({
            status: 'success',
            data: newPage
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
