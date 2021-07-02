const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const router = require('./routes/index');
const mongoose = require('mongoose');




//Mongo DB connect
mongoose.connect('mongodb://127.0.0.1:27017/gosafe', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Mongodb Connected"))
    .catch((err) => console.log(err));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//app.use(expressLayout);
app.set('view engine', 'ejs');

//for routing paths
app.use('/', router);

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})