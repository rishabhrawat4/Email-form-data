const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

app.use(bodyParser.urlencoded({extended: false}))

app.set("view options", {layout: false});
app.use(express.static(__dirname + '/source'));

require('dotenv').config();

function sendMail(data) {
    let transport = nodemailer.createTransport({
        service: process.env.service,
        auth: {
           user: process.env.email,
           pass: process.env.password
        }
    });
    
    const message = {
        from: process.env.email,
        to: data.email,        
        subject: 'Design Your Model S | Tesla', 
        text: 'Your name is: ' + data.name + ' Your Email is: ' + data.email + ' your phone no is: ' + data.number
    };
    transport.sendMail(message, function(err, info) {
        if (err) {
          console.log(err)
        } else {
          console.log(info);
        }
    });
}


app.get('/', function(req, res) {
    res.render('index.html');
});

app.post('/get-post', function (req, res) {
    const data = req.body;
    var userData = {
        name: data.name,
        email: data.email,
        number: data.number
    }
    sendMail(userData);
    res.send(userData);
});

app.listen(3000, '127.0.0.1');