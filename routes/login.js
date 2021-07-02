const express = require('express');
const app = express();
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login.ejs');
});








module.exports = router;