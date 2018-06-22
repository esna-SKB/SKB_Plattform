var express = require('express');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
const Image = require('../models/image');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${new Date()}-${file.originalname}`)
  }
});

var upload = multer({ storage: storage }).single('profileImage');

router.route('/:email')

	.post('/', function (req, res) {
	  upload(req, res, function (err) {
		if (err) {
			res.json({
				success: false,
				message: 'An error occured when uploading'	
			});
		  return
		}
		// Everything went fine
		//upload was sucessful now save to mongoDB
	  })
	})



//TODO: modify 

	/*creates a new profile picture of one email*/
	.post((req, res, next) => {
		const { body } = req;
		const { type } = body;
		const { data } = body;
			
		var email = req.params.email;
		
		Image.find({email: email},{}, function(err, otherImage){
			if(err){
				console.log('error occured in the database');
				return res.status(500).send({
			    success: false,
			    message: 'Error: Server error'
				});
			}else if(otherImage.length > 0){
				return res.status(404).send({
					success: false,
					message: "An Image for that email exists already"
				}); 
			} else {
				//save new image
				const newImage = new Image();
				newImage.email = email;
				newImage.data = data;
				newImage.type = type;
				newImage.save(function(err){
					if(err){
						return res.status(500).send({
							success: false,
							message: 'Error: save error'
						});
					}else {
					return res.status(200).send({
							success: true,
							message: "new Image is saved"
						});
					}
				});
			}
		})
	})
	
	
	/*updates the profile picture of one email*/
	.put((req, res, next) => {
		const { body } = req;
		const { data } = body; 
		const { type } = body; 
		
		var email = req.params.email;

		
		Image.find({email : email},{}, function(err, imagesfound){
			if(err){
					return res.send({success : false, message : "error accured in database"})
				}else if(imagesfound.length == 0 ){
					return res.send({success : false, message : "no image found to update"})
				} else {
					//valide update
					Image.update(
						{ email: email }, { email : email, data : data, type: type }
						, function(err, affected){
						if (err) {
							return res.status(500).send({success : false, message : "image could no be updaten, error accured while update"});
						} else if(affected.n == 0){
							return res.status(404).send({success : false, message : "image to update counld not be found"});
						} else {
							return res.status(200).send({success : true, message : "image is updated"})
						}
					});
				}
			})
	})
	
	
	/*send the profilepictue of one profile*/
	.get((req, res, next) => {
		var email = req.params.email; 
		Image.findOne({email: email},{},function(err, imagefound){
			if (err)return res.status(500).send('error occured in the database');
	       	else if(group == null) res.status(404).send('image could not be found');
	       	else {
				return res.status(200).send(imagefound); 
	       	}
		})
	})
	
	
	/*deletes the profile picture of one email*/
	.delete((req,res,next) => {
		var email = req.params.email; 
		
		Image.deleteOne({email: email}, function(err,affected){
			if (err)
	           return res.status(500).send({success : false, message : "error accured in database"});
	       	else if(affected.n == 0){
	       		return res.status(401).send({success : true, message : "image is was not in database"});
	       	} else{
				return res.status(200).send({success : true, message : "Image is deleted"}); 
	       	}
		})
	})

	