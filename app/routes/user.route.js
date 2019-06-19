// Set up router =========================================================================
const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../../config/checkjwt')

router.get('/profile', ensureAuthenticated, (req, res) => {
    res.render('profile', {
        user: req.user
    });
});

module.exports = router;