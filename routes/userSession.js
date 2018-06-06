var express = require('express');
var router = express.Router();
var crypto = require('crypto');

const User = require('../models/user');
const UserSession = require('../models/UserSession');


//check if UserSession is still active and update
router.route('/check').post((req, res, next) => {
	const { body } = req;
	const { token } = body;

	console.log(token);

  
	UserSession.findOne({ token: token },
		function(err, usersession){
			if(err){
				console.log('error occured in the database');
				res.status(500).send({
					success: false,
					message: 'Server Error'
				});
			}else if(!usersession){
				console.log("no matching User Session");
				res.status(202).send({
					success: false,
					message: 'No matching User Session'
				});
			} else if( usersession.isDeleted ){
				console.log("User Session not available anymore (deleted)");
				res.status(202).send({
					success: false,
					message: 'User Session not available anymore (deleted)'
				});
			} else{
				//check timestamp
				var d = new Date();
				//40 muss später geupdated werden
				d.setTime(d.getTime() - (60*20*1000))
				//korrekte Form? maybe ohne getTime..? maybe .. > d - d
				if (d.getTime() - usersession.timestamp.getTime() > 0){
					console.log("User Session not available anymore (timeout)");
					res.status(202).send({
						success: false,
						message: 'User Session not available anymore (timeout)'
					});
				} else{
					d = new Date();
					//to UTC String?
					usersession.timestamp = d;

					usersession.save((err, doc) => {
				        if (err) {
				          	console.log(err);
			            	res.status(500).send({
			            		success: false,
			            		message: 'Error: server error'
				          	});
				        }
				        else{
							console.log("checked and updated User Session");

							res.status(200).send({

								success: true,
								message: 'checked and updated User Session'
							});
						}
					});

				}
			console.log(usersession);
			}
	});
});


//generate new token
router.route('/newtoken').post((req, res, next) =>{
	const { body } = req;
	const { email } = body;

	console.log(email);

	UserSession.findOne({userId: email}, function(err, usersession){
		if(err){
			console.log('error occured in the database');
			res.status(500).send({
				success: false,
				message: 'Server Error'
			});
		}else if(!usersession){
			console.log("No User Session found");
			res.status(202).send({
				success: false,
				message: 'No User Session found)'
			});
		} else {
			var d = new Date();
			var t = crypto.randomBytes(16).toString('hex');

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
					console.log("new token for User Session");

					res.status(200).send({

            success: true,
						message: 'new token for User Session'
					});
				}
			});

		}
	})
	console.log(usersession);
});


//get current token (just available for X sec after generation of new token)
router.route('/:emailtoken').get((req, res, next) =>{
	var email = req.params.emailtoken;

	console.log(email);

	UserSession.findOne({userId: email}, function(err, usersession){
		if(err){
			console.log('error occured in database');
			return res.send('error occured in database')
		}		

		console.log(usersession);
		if(!usersession){
			console.log("No User Session found");
			return res.send('No User Session found')
		} else {
			var d = new Date();
			d.setTime(d.getTime() - (5*1000));
			if(d>usersession.timestamp){
				console.log('Time expired to get Token');
				return res.send('Time expired to get Token');
			}
			console.log('take your token:'+usersession.token);
			return res.send(usersession);
		}
	})
});


//delete Session
router.route('/deleteSession').post((req, res, next) =>{
	const { body } = req;
	const { token } = body;


	UserSession.findOne({token: token}, function(err, usersession){
		if(err){
			console.log('error occured in the database');
			res.status(500).send({
				success: false,
				message: 'Server Error'
			});
		}else if(!usersession){
			console.log("No User Session found");
			res.status(202).send({
				success: false,
				message: 'No User Session found)'
			});
		} else {
			usersession.isDeleted = true;
			usersession.save((err, doc) => {
		        if (err) {
		          	console.log(err);
	            	res.status(500).send({
	            		success: false,
	            		message: 'Error: server error'
		          	});
		        }
		        else{
					console.log("User Session deleted");

					res.status(200).send({

            			success: true,
						message: 'User Session deleted'
					});
				}
			});
		}
	})

});



module.exports = router;
