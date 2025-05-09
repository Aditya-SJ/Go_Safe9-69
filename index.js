require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');

    const newUser = new User({
        name: 'Aditya Singh',
        email: 'adityastark179022@gmail.com',
        password: 'Aditya.S1234',
        phone_number: 9876543210,
    });

    newUser.save().then(() => {
        console.log('User saved');
        mongoose.connection.close();
    }).catch(err => console.error('Save error:', err));

}).catch(err => console.error('Connection error:', err));