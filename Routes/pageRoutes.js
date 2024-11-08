const express = require('express');
const pageController = require('../Controller/pageController');
const authController = require('../Controller/authController');

const router = express.Router();

// Protect all routes below this line
router.use(authController.protect);

router
    .route('/')
    .get(pageController.getAllPages)  // Get all pages (could be scoped to a document if needed)
    .post(pageController.createPage); // Create a new page

router
    .route('/:id')
    .get(pageController.getPage) // Get a single page by ID
    .patch(authController.restrictTo('admin'), pageController.updatePage) // Update a page (admin only)
    .delete(authController.restrictTo('admin'), pageController.deletePage); // Delete a page (admin only)

// Get all pages for a specific document
router.get('/document/:documentId', pageController.getAllPagesByDocument);

module.exports = router;
