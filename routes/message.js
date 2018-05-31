var express = require('express');
var router = express.Router();
const Message = require('../models/message');

router.route('/')
	//get all Messages
	.get((req, res, next) => {
		Message.find({},{_id:0, fromUser:1, toUser:2, text:3, created_at:4}, function(err, messages){
			if (err) {
				console.log('error occured in the database');
	        	return res.send('error occured in the database');
			} else {
				return res.send(messages); 
	       	}
		})
	})

	//post new Message
	.post((req, res, next) => {
		const { body } = req;
		const { fromUser } = body;
		const { toUser } = body;
		const { text } = body;

		
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
	})

router.route('/from/:fromUser/to/:toUser')
	
	// get all messages between fromUser and toUser sorted by most resently posted
	.get((req, res, next) => {
		var fromUser = req.params.fromUser; 
		var toUser = req.params.toUser; 
		Message.find({$or:[{fromUser: fromUser, toUser:toUser}, {fromUser:toUser, toUser:fromUser}]},{},
		{$sort:{created_at: -1}}, function(err, messages){
			if (err){
				console.log('error occured in the database');
	        	return res.send('error occured in the database');
	       	}else {
				return res.send(messages); 
	       	}
		})
	})

	//deletes one Message from DataBase 
	.delete((req, res, next) => {
		var fromUser = req.params.fromUser; 
		var toUser = req.params.toUser; 

		Message.deleteMany({$or:[{fromUser: fromUser, toUser:toUser}, {fromUser:toUser, toUser:fromUser}]}, function(err, affected){
			if (err)
	           return res.send({success : false, message : "error accured in database"});
	       	else if(affected.n == 0){
	       		return res.send({success : true, message : "Messages were not in database"});
	       	} else {
				return res.send({success : true, message : "Messages are deleted"}); 
	       	}
		})
	})

	router.route('/:id')

		.get((req, res, next) => {
			var id = req.params.id;
			Message.findById(id,{}, function(err, message){
				if (err){
					console.log('error occured in the database');
		        	return res.send('error occured in the database');
		       	}else {
					return res.send(message); 
		       	}
			})
		})

		.delete((req, res, next) => {
			var id = req.params.id;

			Message.deleteOne({_id:id}, function(err){
				if (err){
					console.log('error occured in the database');
		        	return res.send('error occured in the database');
		       	} else {
					return res.send({success : true, message : "Message is deleted"}); 
		       	}
			})
		})

	module.exports = router

