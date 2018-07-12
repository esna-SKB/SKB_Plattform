var express = require('express');
var router = express.Router();
const Article = require('../models/article');
const Course = require('../models/course');
const User = require('../models/user');
const Group = require('../models/group');

router.route('/all/:id')

	// get all articles of a course/group/channel aka cgc
	.get((req, res, next) => {
		var id = req.params.id;
				//we have no errorHandling if course/group/channel doesnt exists....it's about trust XD  or we check all three possibilites(or maybe theres a shorter way)
				Article.find({'theChosenModel.ModelId': id}).populate('author').exec(function(err, articles){
					if (err){
						console.log('error occured in the database');
			        	return res.status(500).send('error occured in the database');
			       	}else {
						return res.status(200).send(articles);
			       	}
				})
	})
	
	
	//post new Article
	.post((req, res, next) => {

		const { body } = req;
		const { ModelId } = body;
		const { kind } = body;
		const { NameOfModel } = body;
		const { headline } = body;
		const { author } = body;
		const { text } = body;
		const { data } = body;
		const { fileName} = body;
		const { type } = body;
		const { created_at } = body; //könnte auch automatisch gespeichert werden
		
		console.log(ModelId,kind, author);

		/*Course.findOne({name: course}).exec(function(err, courseE){
			if(err) return res.status(500).send('error occured in the database');
			else if(courseE == null ) {
				console.log(courseE)
				return res.status(404).send('course could not be found');
			}*/
			User.findOne({email:author}).exec(function(err, userE){
				if(err) return res.status(500).send('error occured in the database');
				else if(userE == null ) return res.status(404).send('author could not be found');
				// Save the new Article
				const newArticle = new Article();
				newArticle.theChosenModel.kind = kind;
				newArticle.theChosenModel.ModelId = ModelId;
				newArticle.NameOfModel = NameOfModel;
				newArticle.headline = headline;
				newArticle.author = userE._id;
				newArticle.text = text;
				newArticle.data = data;
				newArticle.dataName = fileName;
				newArticle.type = type;
				newArticle.created_at = new Date();
				newArticle.save(function(err){
					if(err) return res.status(500).send('error occured in the database');
					else {
            return res.status(200).send({
              success: true,
              message: "new Article is saved",

						});
					}
				});
			})
		})

	

	router.route('/file/:articleid')
	
	/*get file of one article*/
	.get((req, res, next) => {
		var id = req.params.articleid
		Article.findOne({_id: id}, function(err, foundArticle) {
			if(err) {
				return status(500).send('error occured in database')
			} else {
				return res.status(200).send(foundArticle.data);
			}
		})
	})

	router.route('/:id')

		/*get one specific article*/
		.get((req, res, next) => {
			var id = req.params.id;
			Article.findById(id).populate('author').exec(function(err, article){
				if (err){
		        	return res.status(500).send('error occured in the database');
		       	}else {
					return res.status(200).send(article);
		       	}
			})
		})

		
		/*delete one article*/
		.delete((req, res, next) => {
			var id = req.params.id;

			Article.deleteOne({_id:id}, function(err){
				if (err){
					console.log('error occured in the database');
		        	return res.status(500).send('error occured in the database');
		       	} else {
					return res.status(200).send({success : true, article : "Article is deleted"});
		       	}
			})
		})

		.put((req, res, next) => {
			const { body } = req;
			var articleid  = req.params.id;
			const { updatedText } = body;
			const { deleteFile } = body;

			Article.findOne({_id: articleid}, 
				function(err, foundArticle){
					if (err){
						console.log('error occured in the database');
			        	return res.status(500).send('error occured in the database');
			       	} else {
			       		foundArticle.text = updatedText;
			       		if(deleteFile){
			       			foundArticle.data = "";
			       			foundArticle.type = "";
			       			foundArticle.dataName = "";
			       		}
			       		foundArticle.save(function(error){
			       			if(error){
			       				return res.status(500).send('error occured in the database');
			       			} else{
								return res.status(200).send({success : true, article : "Article is updated"});
			       			}
			       		})
			       	}
				}
			);

		})

		router.route('/:id/comments')

			/*get comments of article*/
			.get((req, res, next) => {
				var id = req.params.id;
				Article.findById(id).populate('teacher').exec(function(err, article){
					if (err){
			        	return res.status(500).send('error occured in the database');
			       	}else {
						return res.status(200).send(article.comments);
			     	}
				})
			})

	module.exports = router
