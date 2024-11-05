const express = require('express');
const authController = require('../Controller/authController');

const router = express.Router();
router.post('/register', authController.createUser);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword', authController.resetPassword);
module.exports = router;
