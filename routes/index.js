const express = require('express');
const router = express.Router();


router.use('/register', require('./register'));
router.use('/login', require('./login'));
router.use('/dashboard', require('./dashboard'));



router.get('/', (req, res) => {
    res.render("welcome.ejs");
});

module.exports = router;