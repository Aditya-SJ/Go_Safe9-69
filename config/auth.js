module.exports = {
    ensureAuthentication: function(req, res, next) {
        // console.log("hello auth page", req.user)
        if (req.isAuthenticated())
            return next();

        req.flash('error_msg', 'Please log in');
        res.redirect('/login');
    }
}