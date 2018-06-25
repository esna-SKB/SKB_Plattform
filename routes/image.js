/*
Some informations to understand the multer:
multer is a middleere that helps you handle uploads
storage gives us more control than simple 'dest'
dest: a folder where the files will be saved, the folder must be created beforehand!
.single('name') : accept a single file with the name 'name'. the single file will be stored in req.file
multer awaits a formData

WARNING: Make sure that you always handle the files that a user uploads. Never add multer as a global middleware since a malicious user could upload files to a route that you didn't anticipate. Only use this function on routes where you are handling the uploaded files.

*/


var express = require('express');
var router = express.Router();
var multer  = require('multer');
const Image = require('../models/image');
var fs = require('fs');

var imageID ='';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
     cb(null, file.fieldname + '-' + imageID +'.'+

	 file.originalname.split(/[. ]+/).pop())      
  }
});


//file must exist in a formData with key: profilepic basically formData.append("profilepic", file) when sending to router
var upload = multer({ storage: storage }).single('profilepic');

router.route('/:email')

	.post((req, res, next)  => {
		//other idea , save type in formdata which is contained in body
		imageID = req.params.email;
		console.log("imageID:"+ imageID);
		
		upload(req, res, function (err) {
		if (err) {
		  // An error occurred when uploading
		  
		  return
		}
		// Everything went fine
		/*url = file.fieldname + '-' + imageID;
		var imageData = fs.readFileSync(__dirname + url);

		//save to mongodb
		img = new Image();
		img.email = req.params.email;
		img. data = req.body.file;
		img.type = req.file.type;
		img.save(function(err){
					if(err) return res.status(500).send('error occured in the database');
					else {
					return res.status(200).send({
						success: true,
						message: "new file is saved",
						});
					}
				});*/
		})
	})
	



module.exports = router
	