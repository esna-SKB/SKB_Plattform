var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var nodemailer = require('nodemailer');

const User = require('../models/user');
const UserSession = require('../models/UserSession');
const RegistrationToken = require('../models/registrationToken');
const Email = require('../emails/registrationMail');

router.route('/signin')

/*
 * Signin
 */
	.post((req, res, next) => {
	    const { body } = req;
	    const { password } = body;
	    let { email } = body;

	    console.log(password)
	    console.log(email)

	    User.findOne({email: email},{_id:0, email:1, password:2, isVerified:3},function(err,user){
	    	if (err)
	           console.log('error occured in the database');

			//const user = users[0];
			console.log(user);
				if (!user || !user.validPassword(password)){
					console.log("no user / wrong passwort");
					res.status(401).send({
						success: false,
						message: 'No account or wrong Password'
					});
				}
				else if (user.isVerified === false){
					console.log("not verified");
					res.status(401).send({
						success: false,
						message: 'User not verified yet'
					});
				}
	    	else{
					//create new user session
				  const userSession = new UserSession();
		    	userSession.userId = user._id;
		    	userSession.save((err, doc) => {
			        if (err) {
			          console.log(err);
		            res.status(500).send({
		            success: false,
		            message: 'Error: server error'
			          });
			        }
			        else{
							  res.send({
		          	success: true,
		          	message: 'Valid sign in',
		          	token: doc._id
		        		});
								console.log(doc._id);
	      		 }
				  });
			}
		});
});
router.route('/signup')
/*
 * Sign up
 */
 	.post((req, res, next) => {
		const { body } = req;
		const { firstname } = body;
		const { lastname } = body;
		const { password } = body;
		let { email } = body;
		console.log(password);
		email = email.toLowerCase();
		email = email.trim();

		User.findOne({ email: email }, (err, user) => {
			if (err) {
			  return res.status(500).send({
			    success: false,
			    message: 'Error: Server error'
			  });
			} else if (user) {
				if(user.isVerified == 0){
					res.status(400).send({
				    success: false,
				    message: 'Error: Account not verified yet.'
				  });
				}
			  else{
					res.status(400).send({
			    success: false,
			    message: 'Error: Account already exist.'
			  });
				}
			} else{
				// Save the new user
				const newUser = new User();
				newUser.firstname = firstname;
				newUser.lastname = lastname;
				newUser.email = email;
				newUser.password = newUser.generateHash(password);
				newUser.save();

				//Send registration Email
				// Create a verification token for this user
        var token = new RegistrationToken({ _userId: newUser._id, token: crypto.randomBytes(16).toString('hex') });
				// Save the verification token
        token.save(function (err) {
            if (err) { return res.status(500).send({ message: err.message }); }
				});
				//actually send email
				var link = "http://"+req.headers.host+"/account/registration/verify?token=" + token.token;
				Email.sendSignUpMail(newUser, link);

				return res.send({
			    success: true,
			    message: 'Account created.'
			  });
			}
		});
	}); // end of sign up endpoint

router.route('/registration/verify')
/*
 * Verify Email Registration
 */
	.get((req, res, next) => {
		var token = req.query.token;

		// Find a matching token
	 RegistrationToken.findOne({ token: token }, function (err, token) {
			 if (!token) return res.status(400).send({ type: 'not-verified', message: 'Registrierungslink ist ungültig.' });

			 // If we found a token, find a matching user
			 User.findOne({ _id: token._userId }, function (err, user) {
					 if (!user) return res.status(400).send({ message: 'Der Link konnte keiner Registrierung zugeordnet werden'});
					 //if (user.isVerified) return res.status(400).send({ type: 'already-verified', message: 'Deine Registrierung wurde bereits bestätigt.' });

					 // Verify and save the user
					 user.isVerified = true;
					 user.save(function (err) {
							 if (err) { return res.status(500).send({ msg: err.message }); }
							 res.status(200).send("Deine Registrierung war erfolgreich. Du kannst dich jetzt einloggen.");
					 });
			 });
	 });

	}); // end of verify registration endpoint




module.exports = router
