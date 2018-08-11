const express = require('express');
const app = express();
const fs=require('fs');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors=require('cors');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'));
app.use(cors());
let port = 3000;


app.post('/sendMail', (req, res) => {

    console.log(req.body);

    // nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            // service: 'gmail',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'anuragkhandelwalresume@gmail.com',
                pass: 'password4resume'
            }
        });

        let mailOptions = {
            from: 'anuragkhandelwalresume@gmail.com', // sender address
            to: req.body.email, // list of receivers
            subject: 'Resume- Anurag Khandelwal', // Subject line
            // text: 'Hello '+ req.body.name+',', // plain text body
            html: 'Hello <b>' + req.body.name + '</b>, <br>Please Find The Attached Resume.', // html body
            attachments: [{
                filename: 'resume.pdf',
                path: './assets/resume2018.pdf'
            }]
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({
                    message:'Server Error'
                })
                // return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            // res.send("successfullys")

            res.status(200).json({
                message: 'Resume sent successfully, check your mail.'
            })
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    // });
    // res.send('Server running!')
})


app.set('port', (process.env.PORT || port));

app.listen(app.get('port'), () => {
    console.log("server is running on port:", port || process.env.PORT);
});



