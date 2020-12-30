const nodemailer = require('nodemailer');

exports.sendMail = function(data) {
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
        subject: 'Hello ' + data.name, 
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
