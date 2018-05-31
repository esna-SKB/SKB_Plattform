var nodemailer = require('nodemailer');

module.exports = {
  // creates reusable transporter object using the default SMTP transport
  sendSignUpMail: function(user, link){
      let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
              user: 'esnainfotest@gmail.com', // generated ethereal user
              pass: 'Esna123?'// generated ethereal password
          }
      });
              // setup email data that is send after sign up
      let mailOptions = {
          from: '"Esna" <noreply@esna.com>', // sender address
          to: user.email, // list of receivers
          subject: 'Herzlich Willkommen bei Esna', // Subject line
          //text: 'Hi ' + user.firstname + '! Herzlich Willkommen bei Esna', // plain text body
          html: '<p>Hallo ' +  user.firstname + '!</p>\
          <p>Herzlich Willkommen bei Esna - der Kommunikationsplattform der SKB.</p>\
          <p>Um deine Registrierung abzuschliessen, klicke <a href =' + link + ' >hier</a>.</p>' // html body
      };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    });
  }
}
