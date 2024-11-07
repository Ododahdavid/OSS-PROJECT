const express = require('express');
const projectController = require('../Controller/projectController');
const authController = require('../Controller/authController');
const router = express.Router();

    // Public Routes
    router.use(authController.protect); // Protect all routes below this line

    // User-based project routes
    router
    .route('/')
    .get(projectController.getAllProjects) // Get all projects (for authenticated users)
    .post(projectController.createProject); // Create a new project

    router
    .route('/projects/:id')
    .get(projectController.getProject) // Get project by ID
    .patch(authController.restrictTo('admin'),projectController.updateProject) // Update project by ID
    .delete(authController.restrictTo('admin'),projectController.deleteProject); // Delete project by ID

module.exports = router;
