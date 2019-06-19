// Set up router =========================================================================
const express = require('express')
const router = express.Router()
// Set up middleware =====================================================================
const passport = require('passport')
const requireJWTAuth = passport.authenticate("jwt", { session: false })

router.get('/profile', requireJWTAuth, (req, res) => {
    res.render('profile', {
        user: req.user
    });
});

module.exports = router;