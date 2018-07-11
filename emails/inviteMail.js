var nodemailer = require('nodemailer');

module.exports = {
  // creates reusable transporter object using the default SMTP transport
  sendInviteMail: function(email, link, courseName){
      let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
              user: 'esnainfotest@gmail.com', // generated ethereal user
              pass: 'Esna123?'// generated ethereal password
          }
      });
          // setup email data that is send for invitation
      let mailOptions = {
          from: '"Esna" <noreply@esna.com>', // sender address
          to: email, // list of receivers
          subject: 'Einladung zum Kurs ' + courseName, // Subject line
          html: '<p>Hallo!</p>\
          <p>Du wurdest für den Kurs' + courseName + ' freigeschaltet.</p>\
          <p><a href =' + link + ' >Hier</a> kommst du direkt zum Kurs.</p>'
          // html body
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
