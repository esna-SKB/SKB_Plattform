var express = require('express');
var router = express.Router();
const Course = require('../models/course');
const User = require('../models/user');
const Preference = require('../models/preference');
var tinder = require('./tinder');


router.route('/makegroups/:courseId')
	.get((req, res, next) => {
		var courseId = req.params.courseId;
			Preference.findOne({course: courseId}).exec(function(err, pref){
				if(err) return res.status(500).send({message:'error occured in the database'});
				else if(pref === null) return res.status(404).send({message:'pref not found'});
				else{
					var groups = tinder(pref.users, pref.matrix, pref.groupSize); 
					return res.status(200).send(groups);
				}
			})
		})

router.route('/')
	.post((req, res, next) => {

		const { body } = req; 
		var updatePref = body; 
		const { course } = req.body; 
		console.log('save pref', updatePref)
		Course.find({_id:course}).exec(function(err, courses){
			if(err) return res.status(500).send('error occured in the database');
			else if(courses.length===1) {
				Preference.find({course: course}).exec(function(err, pref){
					if(err) return res.status(500).send('error occured in the database');
					else if(pref.length===0){
						var newPref = new Preference(updatePref); 
						newPref.save(function(err){
							if(err) return res.status(500).send('error occured while saving new pref');
							else {
								return res.status(200).send({
								success: true,
								message: "new Pref is saved"
								});
							}
						})
					} else return res.status(404).send({success: true, message: 'there is allready one pref for the course'});
				})
			} else return res.status(404).send('there is no such course');
		})
	})

router.route('/:courseId')
	
	.get((req, res, next) => {
		const id = req.params.courseId;
		console.log("pref courseID: "+id)
				//we have no errorHandling if course/group/channel doesnt exists....it's about trust XD  or we check all three possibilites(or maybe theres a shorter way)
			Preference.find({course: id}).exec(function(err, preferences){
				if (err){
		        	return res.status(500).send({success : false, obj:'error occured in the database'});
		       	} else if(preferences.length===0){
		       		return res.status(200).send({success : false, obj:'no pref set'});
		       	} else {
					return res.status(200).send({success : true, obj: JSON.stringify(preferences[0])});
		       	}
			})
		})

	.put((req, res, next) => {
		const { body } = req; 
		var updatePref = body; 
		const { course } = req.body;
		Preference.findOneAndUpdate({course: course}
					, updatePref
					, {new: true, upsert:true}, function(err, pref){
						if (err){
							return res.status(500).send({success : false, message : "pref is not updated"});
						}else if(pref == null){
							return res.status(401).send({success : false, message : "pref from: " + course + " is not in database"});
						} else {
				       		return res.status(200).send({success : true, message : pref});
				       	}
					})
	})

	.delete((req, res, next) => {
			var id = req.params.coursesId;
			Preference.deleteOne({course:id}, function(err){
				if (err){
			       	return res.status(500).send('error occured in the database');
			    }else {
					return res.status(200).send('pref is saved');
			    }
			})
		})

	module.exports = router