module.exports = {
    ensureAuthenticated: (req, res, next) => {
      if (req.cookies['jwt']) {
        return next()
      }
      req.flash('error_msg', 'Please login to view that resource')
      res.redirect('/index')
    },
    forwardAuthenticated: (req, res, next) => {
      if (!req.cookies['jwt']) {
        return next()
      }
      res.redirect('/profile')
    }
}