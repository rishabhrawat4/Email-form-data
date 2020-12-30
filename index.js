const express = require('express');
const app = express();
var path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './source'))


require('dotenv').config();

const { sendMail } = require('./utils');

app.get('/', function (req, res) {
    res.render('index.ejs', {msg: "After submitting form you will receive a email on the registered mail"});
});

app.post('/get-post', function (req, res) {
    const data = req.body;
    var userData = {
        name: data.name,
        email: data.email,
        number: data.number
    }
    sendMail(userData);
    res.redirect('/'); 
});

const port = process.env.PORT || 3000;
app.listen(port);