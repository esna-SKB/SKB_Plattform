var express = require('express');
var router = express.Router();
const Message = require('../models/message');
const User = require('../models/user');
const app = require('../server');


router.route('/')
	//get all Messages
	.get((req, res, next) => {
		console.log(req.app.get('io'))
		Message.find({},{_id:0, fromUser:1, toUser:2, text:3, created_at:4}, function(err, messages){
			if (err) {
				console.log('error occured in the database');
	        	return res.send('error occured in the database');
			}
			else {
				return res.status(200).send(messages);
	       	}
		})
	})

	//post new Message
	.post((req, res, next) => {
		const { body } = req;
		const { fromUser } = body;
		const { toUser } = body;
		const { text } = body;

		//Check if both users exist
		User.findOne({email: fromUser},{}, function(err, user){
			if (err){
						 console.log('error occured in the database');
						 return res.status(500).send({success:false, message:'error occured in the database'});
			}
			else {
				if (user === null){
					return res.status(400).send({success: false, message: 'user not found'})
				}
				else{
					User.findOne({email: toUser},{}, function(err, user){
						if (err){
									 console.log('error occured in the database');
									 return res.status(500).send({success:false, message:'error occured in the database'});
						}
						else {
							if (user === null){
								return res.status(400).send({success: false, message: 'user not found'})
							}
							else{
								if(typeof text != "string"){
									return res.status(400).send({success: false, message: 'text must be a string'})

								}
								else{
									// Save the new Message
									const newMessage = new Message();
									newMessage.fromUser = fromUser;
									newMessage.toUser = toUser;
									newMessage.text = text;
									newMessage.save(function(err){
										if(err) handleError(err);
										else {
										return res.send({
											success: true,
											message: "new Message is saved"
											});
										}
									});
								}
							}
						}
					})
				}
			}
		})
	})

router.route('/from/:fromUser/to/:toUser')

	// get all messages between fromUser and toUser sorted by most resently posted
	.get((req, res, next) => {
		var fromUser = req.params.fromUser;
		var toUser = req.params.toUser;

		//Check if both users exist
		User.findOne({email: fromUser},{}, function(err, user){
			if (err){
						 return res.status(500).send({success:false, message:'error occured in the database'});
			}
			else {
				if (user === null){
					return res.status(400).send({success: false, message: 'user not found'})
				}
				else{
					User.findOne({email: toUser},{}, function(err, user){
						if (err){
									 return res.status(500).send({success:false, message:'error occured in the database'});
						}
						else {
							if (user === null){
								return res.status(400).send({success: false, message: 'user not found'})
							}
							else{
								Message.find({$or:[{fromUser: fromUser, toUser:toUser}, {fromUser:toUser, toUser:fromUser}]},{},
								{$sort:{created_at: -1}}, function(err, messages){
									if (err){
										return res.status(500).send('error occured in the database');
											}
									else {
										return res.status(200).send(messages);
									}
								})
							}
						}
					})
				}
			}
		})
	})

	//deletes a Conversation from DataBase
	.delete((req, res, next) => {
		var fromUser = req.params.fromUser;
		var toUser = req.params.toUser;

		Message.deleteMany({$or:[{fromUser: fromUser, toUser:toUser}, {fromUser:toUser, toUser:fromUser}]}, function(err, affected){
			if (err)
	           return res.status(500).send({success : false, message : "error accured in database"});
	       	else if(affected.n == 0){
	       		return res.status(404).send({success : true, message : "Messages were not in database"});
	       	} else {
				return res.status(200).send({success : true, message : "Messages are deleted"});
	       	}
		})
	})

	router.route('/:id')

		.get((req, res, next) => {
			var id = req.params.id;
			Message.findById(id,{}, function(err, message){
				if (err){
					console.log('error occured in the database');
		        	return res.status(500).send('error occured in the database');
		      }
				else if(message == null){
					res.status(404).send({success : false, message : "Messages does not exist"})
				}
				else{
					return res.status(200).send(message);
		       	}
			})
		})

		.delete((req, res, next) => {
			var id = req.params.id;

			Message.deleteOne({_id:id}, function(err, affected){
				if (err){
					console.log('error occured in the database');
		        	return res.status(500).send('error occured in the database');
		    }
				else if(affected.n == 0){
					return res.status(404).send({success : true, message : "Message was not in database"});
				}
				else {
					return res.status(200).send({success : true, message : "Message is deleted"});
		    }
			})
		})

		router.route('/allPartners/:email')

		//returns a list of all users that one user had conversations with already
		.get((req, res, next) => {
			var  userEmail = req.params.email;
			//get all message partners (email adresses)
			var partners = []
			var uniquePartners = []
			var allPartners = []
			Message.find({$or:[{fromUser: userEmail}, {toUser: userEmail}]},{},
			{$sort:{created_at: -1}}, function(err, messages){
				if (err){
					return res.status(500).send('error occured in the database');
						}
				else {
					for (i in messages){
						if (messages[i].fromUser != userEmail){
							partners.push(messages[i].fromUser)
						}else{
							partners.push(messages[i].toUser)
						}
					}
					//make array unique
					uniquePartners = [...new Set(partners)]
					return res.status(200).send(uniquePartners);
				}
			})
		})

	module.exports = router
