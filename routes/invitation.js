var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var nodemailer = require('nodemailer');

const Email_invite = require('../emails/inviteMail');

router.route('/')
/*
 * teacher sends invitation for course
 */
	.post((req, res, next) => {
	    const { body } = req;
			let { courseName } = body;
			let { email } = body;
			//we should probably think about an alternative solution here.
			//sending this link is not really safe
			var link = "http://localhost:3000/courses/" + courseName.replace(" ", "%20");
			Email_invite.sendInviteMail(email, link, courseName);
			res.status(200).send({
					success: true,
					message: 'Invitation Email sent.'
				});
			return;
	})

module.exports = router
