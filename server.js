'use strict';

const express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const UserSession = require('./models/UserSession');


mongoose.connect('mongodb://localhost/esna')
//var esna_db = mongodb.MongoClient.connect('mongodb://localhost:27017');

const app = module.exports = express();

// just middlewears
// I don't know what this does, but it doesn't work without it
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Hello message
app.get('/', function(req, res) {
  res.send('hello there');
  res.end();
});

/*
 * Login
 */

app.post('/api/account/signin', (req, res, next) => {
    const { body } = req;
    const {
      password
    } = body;
    let {
      email
    } = body;

    console.log(password)
    console.log(email)

    // if (!email) {
    //   return res.send({
    //     success: false,
    //     message: 'Error: Email cannot be blank.'
    //   });
    // }
    // if (!password) {
    //   return res.send({
    //     success: false,
    //     message: 'Error: Password cannot be blank.'
    //   });
    // }
    email = email.toLowerCase();
    email = email.trim();

    User.find({},{_id:0, email:1, password:2},function(err,users){
       if (err)
           console.log('error occured in the database');

       // if (users.length != 1) {
       //       return res.send({
       //         success: false,
       //         message: 'Error: Invalid'
       //       });
       // }

      const user = users[0];

       if (user.validPassword(password)) {
         return res.send({
           success: true,
           message: 'Valid sign in'
         });
       } else {
         return res.send({
           success: false,
           message: 'Wrong Password'
         });
       }
   // });


    // User.find({
    //   email: email
    // }, (err, users) => {
    //   if (err) {
    //     console.log('err 2:', err);
    //     return res.send({
    //       success: false,
    //       message: 'Error: server error'
    //     });
    //   }
    //   if (users.length != 1) {
    //     return res.send({
    //       success: false,
    //       message: 'Error: Invalid'
    //     });
    //   }
    //
    //   const user = users[0];
    //   if (!user.validPassword(password)) {
    //     return res.send({
    //       success: false,
    //       message: 'Error: Invalid Password'
    //     });
    //   }
      // Otherwise correct user
      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: 'Error: server error'
          });
        }
        return res.send({
          success: true,
          message: 'Valid sign in',
          token: doc._id
        });
      });
    });
  });



/*
 * Sign up
 */


app.post('/api/account/signup', (req, res, next) => {
  const { body } = req;
  const { firstname } = body;
  const { lastname } = body;
  const { password } = body;
  let { email } = body;

  email = email.toLowerCase();
  email = email.trim();

  User.find({
    email: email
  }, (err, previousUsers) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error: Server error'
      });
    } else if (previousUsers.length > 0) {
      return res.send({
        success: false,
        message: 'Error: Account already exist.'
      });
    }});

    // Save the new user
    const newUser = new User();
    newUser.firstname = firstname;
    newUser.lastname = lastname;
    newUser.email = email;
    newUser.password = newUser.generateHash(password);
    newUser.save();
  //});
}); // end of sign up endpoint


const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
