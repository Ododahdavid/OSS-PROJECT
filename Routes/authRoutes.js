const express = require('express');
const authController = require('../Controller/authController');
const passport = require('passport');
const router = express.Router();

// Route to initiate GitHub login
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub callback route
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/dashboard'); // Redirect or respond with a success message
    }
);

// Logout route (optional)
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/');
    });
});

module.exports = router;

router.post('/register', authController.createUser);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword', authController.resetPassword);
module.exports = router;
