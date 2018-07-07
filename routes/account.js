var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var os = require ('os');

const User = require('../models/user');
const UserSession = require('../models/UserSession');
const RegistrationToken = require('../models/registrationToken');
const Email_register = require('../emails/registrationMail');
const Email_reset = require('../emails/resetPasswordMail');


router.route('/signin')

/*
 * Signin
 */
	.post((req, res, next) => {
			console.log(req)
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
	    		UserSession.findOne({userId: email},function(err, usersession){
	    			if(err)
						console.log('error occured in database');

					if(!usersession){
						console.log('Are you inside here?');
						//create new user session
						var d = new Date();
						const userSession = new UserSession();
			    		userSession.userId = email;
			    		userSession.token = crypto.randomBytes(16).toString('hex');
			    		userSession.timestamp = d;
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
						          	token: userSession.token
					        	});
							}
						});
						console.log(userSession);
					} else {
						var d = new Date();
						var t = crypto.randomBytes(16).toString('hex');
						console.log('t ===== '+t);
						usersession.token = t;
						usersession.timestamp = d;
						usersession.isDeleted = false;
						usersession.save((err, doc) => {
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
						          	token: usersession.token
					        	});
							}
						});
					}
		    	console.log(usersession);
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
				//var link = "http://localhost:3000/verify?token=" + token.token;
				//var link = os.hostname() + "/verify?token=" + token.token;
				var link = "https://9af1dd61.ngrok.io/verify?token=" + token.token;
				Email_register.sendSignUpMail(newUser, link);


				return res.status(201).send({

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
	.post((req, res, next) => {
		const { body } = req;
		const { token } = body;
		//var token = req.query.token;

		// Find a matching token
	 RegistrationToken.findOne({ token: token }, function (err, token) {
			 if (!token) {
				 res.status(400).send({ success: false , message: 'link not valid.' });
			 }
			 else{
			 // If we found a token, find a matching user
			 User.findOne({ _id: token._userId }, function (err, user) {
					if (!user){
						 res.status(400).send({ success: false, message: 'Der Link konnte keiner Registrierung zugeordnet werden'});
					}
					else if(user.isVerified) {
						 return res.status(400).send({ type: 'already-verified', message: 'Deine Registrierung wurde bereits bestätigt.'});
					}
					else{
					 // Verify and save the user
					 user.isVerified = true;
					 user.save(function (err) {
							 if (err) { return res.status(500).send({ success: false, message: err.message }); }
							 res.status(200).send({success: true, message: "verification successful"});
					 });
				 }
			 });
		  }
	 });
	}); // end of verify registration endpoint

	/*
	* Registration resend
	* Sends out Email with registration link SendRegistrationAgain
	*/
	router.route('/registration/resend')
		.post((req, res, next) => {
			const { body } = req;
			let { email } = body;
			email = email.toLowerCase();
			email = email.trim();

			User.findOne({ email: email }, (err, user) => {
				if (err) {
						res.status(500).send({
						success: false,
						message: 'Error: Server error'
						});
				}
				else{
					if(user){
						//Send registration Email
						// Create a verification token for this user
		       	 		var token = new RegistrationToken({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
						// Save the verification token
		        		token.save(function (err) {
		            		if (err) { return res.status(500).send({ message: err.message }); }
						});
						// var link = "http://localhost:3000/verify?token=" + token.token;
						//var link = os.hostname() + "/verify?token=" + token.token;
						var link = "https://9af1dd61.ngrok.io/verify?token=" + token.token;

						Email_register.sendSignUpMail(user, link);
					}
					res.status(200).send({
					    success: true,
					    message: 'Registration Email sent.'
				  	});
					}
			});
		});
	/*
	 * Forgot Password
	 * Sends out Email with Link to reset Password
	*/
	router.route('/forgotPassword')

	.post((req, res, next) => {
 		const { body } = req;
		let { email } = body;
		email = email.toLowerCase();
		email = email.trim();

		User.findOne({ email: email }, (err, user) => {
			if (err) {
			    res.status(500).send({
			    success: false,
			    message: 'Error: Server error'
			  	});
					return;
			}
			else{
				if(user && user.isVerified){
				//actually send email
				//var link = "http://localhost:3000/resetPassword/?id=" + user._id;
				//var link = os.hostname() + "/resetPassword/?id=" + user._id;
 				var link = "https://9af1dd61.ngrok.io/resetPassword/?id=" + user._id;
				Email_reset.sendResetMail(user, link);
				}
				return res.status(200).send({
				    success: true,
				    message: 'ForgotPassword Email sent.'
			  	});
			}
		});
	});	 //end of forgotPassword endpoint

	/*
	 * Reset Password
	 */
	router.route('/resetPassword')
		//change the password of a user
		.put((req, res, next) => {
			const { body } = req;
			const { id } = body;
			const { password } = body;
			console.log(password);
	    User.findOne({_id: id},{},function(err,user){
				if (err) {
		           console.log('error occured in the database');
		           res.status(500).send('error occured in the database');
				}
		    else if(user){
					//user.password = password;
					// console.log(user);
	        user.set({password: user.generateHash(password)});
					user.save(function (err) {
							if (err) {
								res.status(500).send({success : false, message : "password could not be updated"});
						  }
							else{
								res.status(200).send({success : true, message : "password updated"});
							}
					});
		    }
	      else{
	        res.status(404).send({success : false, message : "user not found"});
	      }
			})
		}); //end of reset Password endpoint



	/*
	 *check Password
	 */
	 router.route('/checkPassword')
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
				if (!user.validPassword(password)){
					console.log("wrong password!");
					res.status(401).send({
						success: false,
						message: 'No account or wrong Password'
					});
				}else{
					console.log("correct password!");
					res.status(200).send({
						success: true,
						message: 'correct Password'
					});
				}
			});
		});

module.exports = router
