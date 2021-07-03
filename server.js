const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const router = require('./routes/index');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
require('./config/passport');


//Mongo DB connect
mongoose.connect('mongodb://127.0.0.1:27017/gosafe', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Mongodb Connected"))
    .catch((err) => console.log(err));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


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
})