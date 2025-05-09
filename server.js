const express = require('express');
const app = express();
const router = require('./routes/index');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
require('./config/passport');
require('dotenv').config();
const port = process.env.PORT || 3000;
const url = process.env.uri;



mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true } ,()=>{
    console.log('DB Connection successfully');
});

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//global variables
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//passsport initialization
app.use(passport.initialize());
app.use(passport.session());


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//for all static files
app.use(express.static('public'));

//app.use(expressLayout);
app.set('view engine', 'ejs');

//for routing paths
app.use('/', router);

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
    console.log(`Visit http://localhost:${port}`);
})