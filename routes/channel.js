var express = require('express');
var router = express.Router();
const Channel = require('../models/channel');
Enrollment = require('../models/enrollment');


router.route('/')
	//get all channels
	.get((req, res, next) => {
	
		Channel.find({},{}, function(err, channels){
			if (err) {
				console.log('error occured in the database');
	        	return res.status(500).send('error occured in the database');
			} else {
				return res.status(200).send(channels); 
	       	}
		})
	})
	
	//post new channel
	.post((req, res, next) => {
		const { body } = req;
		const { channelname } = body; 
		const { description } = body;
		const { userId } = body;

		// Save the new channel
		const newChannel = new Channel();
		newChannel.name = channelname;
		newChannel.description = description;
		newChannel.save(function(err){
			if(err) return res.status(500).send('error occured in the database'); 
			else {
			console.log("new Channel is saved! "+ newChannel.name);
			var BreakException = {};

			try {
					if(userId !== ""){
						const Enroll = new Enrollment();
						var en = new Enrollment();
						en.user = userId;
						en.theChosenModel.kind = 'Channel';
						en.theChosenModel.ModelId =newChannel._id;
						en.save(function(err){
							if(err) {
								return res.status(500).send('error occured in the database');
								throw BreakException;
							}
						});
					}
				} catch (e) {
				  if (e !== BreakException) throw e;
				}

				
				return res.status(200).send({
					success: true,
					message: newChannel._id
				});			
			
			}
		});
	})

	

router.route('/:id')
	
	/*GET channel with specific id*/
	.get((req, res, next) => {
		var id = req.params.id; 
		Channel.findOne({_id: id},{}, function(err, channel){
			if (err)return res.status(500).send('error occured in the database');
	       	else if(channel == null) res.status(404).send('channel could not be found');
	       	else {
				return res.status(200).send(channel); 
	       	}
		})
	})
	
	/*update channel with specific id*/
	.put((req, res, next) => {
		const { body } = req; 
		const { name } = body;
		const { description } = body;

		var id = req.params.id; 

		
		Channel.find({_id : id},{}, function(err, channel){
			if(err){
				return res.send({success : false, message : "error accured in database"})
			}else if(channels.length == 0 ){
				return res.send({success : false, message : "new name for channel already exists"})
			} else {
				//valide update new name
				Channel.update(
					{ _id: id }, { name : name, members : members, description: description }
					, function(err, affected){
					if (err) {
						return res.status(500).send({success : false, message : "channel could no be updaten, error accured while update"});
					} else if(affected.n == 0){
						return res.status(404).send({success : false, message : "channel to update counld not be found"});
					} else {
						return res.status(200).send({success : true, message : "channel is updated"})
					}
				});
			}
		})
	})
	

	//deletes one Group from DataBase 
	.delete((req, res, next) => {
		console.log('delete' + req.params.id)
		var id = req.params.id; 

		Channel.deleteOne({_id : id}, function(err, affected){
			if (err)
	           return res.status(500).send({success : false, message : "error accured in database"});
	       	else if(affected.n == 0){
	       		return res.status(401).send({success : true, message : "channel is was not in database"});
	       	} else{
				return res.status(200).send({success : true, message : "channel is deleted"}); 
	       	}
		})
	})


router.route('/:id/members')
	
	/*get all members of a channel */
	.get((req, res, next) => {
		var id = req.params.id; 
		Enrollment.find({ 'theChosenModel.ModelId': id},{}, function(err, enrollments){
			if (err)return res.status(500).send('error occured in the database');
	       	else if(enrollments == null) res.status(404).send('channel could not be found');
	       	else {
				console.log("the enrollments")
				console.log(enrollments)
				return res.status(200).send(enrollments); 
	       	}
		})
	})
		
module.exports = router

