module.exports = {
    ensureAuthentication: function(req, res, next) {
        // console.log("hello auth page", req.user)
        if (req.isAuthenticated())
            return next();

        res.redirect('/login');
    }
}