const Project= require('../Model/projectModel')
const catchAsync = require('../utils/catchAsync');
const AppError=require('../utils/appError');

const { StatusCodes } = require('http-status-codes');

exports.getAllProjects = async (req, res) => {
    const { search, visibility, sort, page = 1, limit = 10 } = req.query;
    // Initialize query object with any default filters
    const queryObj = {};
    // Search by title or tags (full-text search with MongoDB's $text operator)
    if (search) {
        queryObj.$text = { $search: search }; // Performs a full-text search
    }
    // Filter by visibility if specified
    if (visibility && visibility !== 'all') {
        queryObj.visibility = visibility;
    }
    // Create the base query with the filters applied
    let result = Project.find(queryObj);
    // Sorting
    if (sort === 'latest') {
        result = result.sort('-createdAt');
    } else if (sort === 'oldest') {
        result = result.sort('createdAt');
    } else if (sort === 'a-z') {
        result = result.sort('title');
    } else if (sort === 'z-a') {
        result = result.sort('-title');
    }
    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    result = result.skip(skip).limit(Number(limit));
    // Execute query and count total matching documents
    const projects = await result;
    const totalProjects = await Project.countDocuments(queryObj);
    const numOfPages = Math.ceil(totalProjects / limit);
    res.status(StatusCodes.OK).json({ projects, totalProjects, numOfPages });
};

//@desc create project
exports.createProject = catchAsync(async (req, res) => {
    // Extract fields from request body
    const { title, description, visibility, tags } = req.body;

    // Check if title is provided (title is required)
    if (!title) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Project title is required' });
    }
    const project = await Project.create({
        title,
        description,
        visibility: visibility || 'public', 
        tags,
        owner: req.user.userId 
    });
    res.status(StatusCodes.CREATED).json({ project });
});
//@desc get one project

exports.getProject = catchAsync(async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Project not found' });
    }
    res.status(StatusCodes.OK).json({ project });
});

// @desc update project


exports.updateProject = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    // Log the ID for debugging
    console.log('Updating project with ID:', id);

    // Attempt to find and update the project
    const project = await Project.findByIdAndUpdate(id, req.body, {
        new: true, // Return the updated document
        runValidators: true // Run validation on updates
    });

    // If no project is found, send a 404 response
    if (!project) {
        console.log('No project found with that ID');
        return res.status(StatusCodes.NOT_FOUND).json({
            status: 'error',
            message: 'No project found with that ID'
        });
    }

    // Send the updated project as the response
    res.status(StatusCodes.OK).json({
        status: 'success',
        data: {
            project
        }
    });
});
// @desc delete project
exports.deleteProject=catchAsync(async(req,res,next)=>{
    const project=await Project.findByIdAndDelete(req.params.id)
    if(!project){
        return next(new AppError('No project found with that ID',404))
    }
    res.status(StatusCodes.NO_CONTENT).json({
        status:'success',
        data:null
    })
})