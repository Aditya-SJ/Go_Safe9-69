const express = require('express');
const router = express.Router();
require('dotenv').config();



router.get('/', (req, res) => {
    let src = req.query.src;
    let dest = req.query.dest;
    let API_KEY_GLOBAL = process.env.MAP_API_KEY;
    console.log(req.query.src);
    console.log(req.query.dest);
    console.log(API_KEY_GLOBAL);

    res.redirect('back');

});

module.exports = router;