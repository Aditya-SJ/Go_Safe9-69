const express = require('express');
const router = express.Router();


router.use('/register', require('./register'));
router.use('/login', require('./login'));
router.use('/dashboard', require('./dashboard'));
router.use('/logout', require('./logout'));
router.use('/addContact', require('./addContact'));
router.use('/danger', require('./danger'));
router.use('/search_route', require('./search_route'));
router.use('/search_route_initial', require('./search_route_initial'));


router.get('/', (req, res) => {
    res.render("welcome.ejs");
});

module.exports = router;