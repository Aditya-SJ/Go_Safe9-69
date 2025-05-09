const express = require('express');
const router = express.Router();
const transporter = require('../config/node-mailer');
const userModel = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();

// console.log(process.env.user, "......danger route..... ", process.env.pass);

router.get('/', (req, res) => {
    console.log(req.query.lat);
    console.log(req.query.lng);
    console.log(req.query.email);

    let lat = req.query.lat;
    let lng = req.query.lng;
    let email = req.query.email;

    // console.log(lat, lng, email);


    let allEmailAddresses;
    let allPhoneNumbers;
    let allNames;
    let userName;
    let varxx;

    userModel.findOne({
            email: email
        })
        .then((user) => {

            allEmailAddresses = user.relative_email_address;
            allPhoneNumbers = user.relative_phone_numbers;
            allNames = user.relative_names;
            userName = user.name;

            console.log(allEmailAddresses);

            for (let i = 0; i < allEmailAddresses.length; i++) {

                transporter.transporter.sendMail({
                    from: "gosafesafety@gmail.com", // sender address
                    to: allEmailAddresses[i], // list of receivers
                    subject: "Urgent Help", // Subject line
                    text: `Please take immediate action in order to help ${userName} at latitude ${lat}, longitude ${lng}`, // plain text body
                    html: `<h3>Please take immediate action in order to help ${userName} at latitude ${lat}, longitude ${lng}</h3>`, // html body
                }, function(err, info) {
                    if (err) {
                        console.log("error in sending mail", err);
                        return;
                    }
                    console.log(info);
                })
            }


            for (let i = 0; i < allPhoneNumbers.length; i++) {
                // require('dotenv').load();
                var twilio = require('twilio')
                var client = new twilio(process.env.accountSid, process.env.authToken);

                client.messages
                    .create({
                        from: 'whatsapp:+14155238886',
                        body: `Please take immediate action in order to help ${userName} at latitude ${lat}, longitude ${lng}`,
                        to: `whatsapp:+91${allPhoneNumbers[i]}`
                    })
                    .then(message => console.log(message.sid))
                    .catch(error => console.log(error));
            }

        })
        .catch((error) => {
            console.log(error);
        });

    res.send(`<h1>Alerts send to near by police station & your relatives<h1> <a href="http://127.0.0.1:5500/dashboard">Home</a>`);

})




module.exports = router;