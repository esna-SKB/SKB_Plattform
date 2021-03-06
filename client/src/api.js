//this module gives you all 'fetch'-requests to the express Server
//include "const api = require('../api');" in your component &
//use the function via api.functionname..
//in almost all cases the function returns a json object

const cookie = require('react-cookies');
const {updateTimeSec} = require('./utils/userSessionHelper');



module.exports = {
//check if userSession ist still valid
//return status code
userSessionCheck: function(){
  return fetch('/userSession/check', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify( { token: cookie.load('userID') } )
    })
    .then (res => {
      if(res.status === 200){
        cookie.save('userID', cookie.load('userID'), {expires: updateTimeSec(60*20), path: '/'})
      }
      return res.status;
    });
},

getEmailFromUserSession: function(token){
  return fetch('/userSession/'+ token+ '/email', {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }})
  .then(res => res.json())
},
//USERS
/*
 * GET /user
 * returns a list of all users
*/
getAllUsers: function(){
  return fetch('/user', {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }})
  .then(res => res.json())
},
/*
 * GET /user/:email
 * returns an user object
*/
getUser: function(email){
  return fetch('/user/' + email, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }})
  .then(res => res.json())
},
/*
 * PUT /user/:email
 * updates an user object
*/
updateUser: function(email, updateUser){
  return fetch('/user/' + email, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(updateUser)
  })
  .then(res => res.json())
},
/*
* DELETE /user/:email
* deletes an user object
*/
deleteUser: function(email){
 return fetch('/user/' + email, {
   method: 'DELETE'
 })
 .then(res => res.json())
},
//COURSES

/*
 * GET /course
 * returns a list of all courses
*/
  getAllCourses: function(){
    return fetch('/course', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }})
    .then(res => res.json())
  },
/*
 * GET /:email/course
 * returns a list of all courses of a user
*/
  getAllCoursesOfUser: function(email){
    return fetch('/user/'+ email +'/course', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }})
    .then(res => res.json())
  },

  /*
   * POST /course
   * creates a new course
  */
  createCourse: function(name, teacherEmail, description){
    return fetch('/course', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        teacher: teacherEmail,
        description: description,
      }),
    })
    .then(res => res.json())
  },

  /*
   * GET /course/:courseName/user
   * returns a list of all users enrolled in one course
  */
  getAllUsersOfCourse: function(courseName){
    return fetch('/course/'+courseName+'/user', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }})
      .then(res => {
        if (res.status === 200){
          return res.json()}
        else{
          return []
        }
      })
  },
  /*
   * GET /course/:name
   * returns course object
  */
  getCourse: function(courseName){
    return fetch('/course/' + courseName, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }})
    .then(res => res.json())
  },
  /*
   * PUT /course/:courseName
   * updates a course object
  */
  updateCourse: function(courseName, newCourseName, teacherEmail, description, content){
    return fetch('/course/'+courseName, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: newCourseName,
        teacher: teacherEmail,
        description: description,
        content: content
      }),
    })
    .then(res => res.json())
  },
  /*
   * DELETE /course/:name
   * deletes a course object
  */
  deleteCourse: function(courseName){
    return fetch('/course' + courseName, {
      method: 'DELETE'
      })
    .then(res => res.json())
  },

//ENROLLMENT
  /*
   * POST enrollment/:email/:kind/:id
   * enrolls an user in a course
  */
  enrollUser: function(email, ModelId,kind){
    return fetch('/enrollment/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        kind: kind,
        ModelId: ModelId,
      }),
    })
    .then(res => res.json())
  },
    
  /*
   * POST /enrollment/email/:email/id/:id
   * checks if user is enrolled ( success = true/false)
  */
  checkEnrolledUser: function(email, id){
    return fetch('/enrollment/email/'+email+'/id/'+id, {
      method: 'POST'
    })
    .then(res => res.json())
  },

  /*
   * DELETE /enrollment/email/:email/id/:id
   * unenrolls an user from a course
  */
  unenrollUser: function(email, id){
    return fetch('/enrollment/email/'+email+'/id/'+id, {
      method: 'DELETE'
    })
    .then(res => res.json())
  },
//ARTICLES

/*
 * GET /article/course/:courseName
 * returns a list of all articles of a course
*/
  getAllArticles: function(ModelId){
    return fetch('/article/all/'+ModelId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }})
    .then(res => res.json())
  },

  /*
   * POST /article/course/:courseName
   * creates a new article
   * ps: NameOfModel = Name of the Course/Group/Channel
  */
    createArticle: function(ModelId,kind,NameOfModel,headline, author, text, type, created_at, base64file, fileName){


      return fetch('/article/all/'+ModelId, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ModelId: ModelId,
		  kind: kind,
		  NameOfModel: NameOfModel,
          headline: headline,
          author: author,
          text: text,
          data: base64file,
          fileName: fileName,
          type: type,
          created_at: created_at,
        }),
      })
      .then(res => {
        res.json();


      });
    },

    
 
  /*
   * GET /article/id
   * returns an article object
  */
  getArticle: function(articleId){
    return fetch('/article/' + articleId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }})
    .then(res => res.json())
  },

  /*
   * PUT /course/:courseName
   * updates a course object
  */
  updateArticle: function(articleId, updatedText, deleteFile){
    return fetch('/article/'+articleId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        articleId: articleId,
        updatedText: updatedText,
        deleteFile: deleteFile
      }),
    })
    .then(res => res.json())
  },


  /*
   * GET /article/id
   * returns an article object
  */
  getAllArticleComments: function(articleId){
    return fetch('/article/comments/' + articleId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }})
    .then(res => res.json())
  },

  /*
   * DELETE /article/id
   * deletes an article object
  */
  deleteArticle: function(articleId){
    return fetch('/article/' + articleId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json'
      }})
    .then(res => res.json())
  },

//GROUPS
/*
 * GET /groups/course/:courseName
 * returns a list of all groups of a course
*/
  getAllGroupsOfCourse: function(courseName){
    return fetch('/group/course/' + courseName, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }})
    .then(res => res.json())
  },
    
/*
 * GET user/:email/group
 * returns a list of all groups of a user
*/
  getAllGroupsOfUser: function(email){
    return fetch('/user/' + email + '/group', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }})
    .then(res => res.json())
  },

  /*
 * GET user/:email/group
 * returns a list of all users of a group
*/
  getAllMembersOfGroup: function(groupId){
    return fetch('/group/' + groupId + '/members', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }})
    .then(res => res.json())
  },
  

/*
 * POST /group/course/:courseName
 * creates a new group object, group name does not have to be unique. in route there will be checked if: are all members in course, is none of them already in a group(for the course)
*/
Group: function(courseId, groupName, members, description){
    return fetch('/group/course/' + courseId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        groupname: groupName,
        members: members,
        courseId: courseId,
        description: description,
      }),
    })
    .then(res => res.json())
  },
/*
 * GET /groups/:groupId
 * returns a group object
*/
  getGroup: function(groupId){
    return fetch('/group/' + groupId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }})
    .then(res => res.json())
  },
/*
 * PUT /groups/:groupId
 * updates a group object
*/
  updateGroup: function(groupId, groupName, members, description){
    return fetch('/group/'+ groupId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: groupName,
        members: members,
        description: description,
      }),
    })
    .then(res => res.json())
  },
/*
 * DELETE /groups/:groupId
 * deletes a group object
*/
  deleteGroup: function(groupId){
    return fetch('/group/' + groupId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json'
      }})
    .then(res => res.json())
  },

  
//ChANNELS

/*
 * POST /channel/
 * creates a new group object, group name does not have to be unique. in route there will be checked if: are all members in course, is none of them already in a group(for the course)
	userID is optional, you can let one user be automatically enrolled
*/
Channel: function(channelName,description, userId){
	if (userId === undefined){
			userId = "";
	}
    return fetch('/channel/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        channelname: channelName,
        description: description,
		userId: userId, 
      }),
    })
    .then(res => res.json())
  },
/*
 * GET /channel/:channelId
 * returns a channel object
*/
  getChannel: function(channelId){
    return fetch('/channel/' + channelId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }})
    .then(res => res.json())
  },
  
  /*
 * PUT /channel/:channelId
 * updates a channel object
*/
  updateChannel: function(channelId, channelName, members, description){
    return fetch('/channel/'+ channelId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: channelName,
        members: members,
        description: description,
      }),
    })
    .then(res => res.json())
  },
  
    /*
 * GET channel/:id/members
 * returns a list of all users of a group
*/
  getAllMembersOfChannel: function(channelId){
    return fetch('/channel/' + channelId + '/members', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }})
    .then(res => res.json())
  },
  
  
  /*
 * DELETE /channel/:channelId
 * deletes a channel object
*/
  deleteChannel: function(channelId){
    return fetch('/group/' + channelId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json'
      }})
    .then(res => res.json())
  },
  
  
  
 
//MESSAGES
/*
 * GET /messages
 * returns a list of all messages
*/
  getAllMessages: function(){
    return fetch('/message', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }})
    .then(res => res.json())
  },
/*
* POST /message
* creates a new message object
*/
createMessage: function(fromUser, toUser, text){
return fetch('/message', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    fromUser: fromUser,
    toUser: toUser,
    text: text
  }),
})
.then(res => res.json())
},
/*
 * GET /message/from/:fromUser/to/:toUser'
 * returns a list of all messages between two users
*/
  getConversation: function(fromUser, toUser){
    return fetch('/message/from/'+fromUser+'/to/'+toUser, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }})
    .then(res => res.json())
  },
/*
 * DELETE /message/from/:fromUser/to/:toUser'
 * returns a list of all messages between two users
*/
  deleteConversation: function(fromUser, toUser){
    return fetch('/message/from/'+fromUser+'/to/'+toUser, {
      method: 'DELETE',
    })
    .then(res => res.json())
  },
/*
 * GET /message/:messageId'
 * returns a message object
*/
  getMessage: function(messageId){
    return fetch('/message/'+ messageId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }})
    .then(res => res.json())
  },
/*
 * DELETE /message/:messageId
 * deletes a message object
*/
  deleteMessage: function(messageId){
    return fetch('/message/'+ messageId, {
      method: 'DELETE',
    })
    .then(res => res.json())
  },

  /*
   * GET /message/allPartners/:userEmail'
   * returns a message object
  */
    getConversationPartners: function(userEmail){
      return fetch('/message/allPartners/'+ userEmail, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }})
      .then(res => res.json())
    },

//TIMELINE
/*
 * GET /user/:email/course/article
 * returns a list of all articles of a user (for the timeline)
*/
  getTimelineArticles: function(email){
    return fetch('timeline/user/' + email + '/course/article', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }})
    .then(res => res.json())
  },
//ACCOUNT
/*
 * POST /account/signup
 * registration of new user
*/
  signUp: function(firstname, lastname, email, password){
    return fetch('/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      }),
    })
    .then(res => res.json())
  },
  /*
   * POST /account/signin
   * login of user
  */
  signIn: function(email, password){
    return fetch('/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
      }),
    }).then(res => res.json())
  },

   /*
   * POST /account/checkPassword
   * check if the correct password was submitted
  */
  checkPassword: function(email, password){
    return fetch('/account/checkPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
      }),
    }).then(res => res.json())
  },
/*
 * POST /account/resetPassword
 * resets the password of an Account
*/
  resetPassword: function(userId, signInPassword){
    return fetch('/account/resetPassword', {

      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        id: userId,
        password: signInPassword
      }),
    }).then(res => res.json())
  },

/*
 * POST /account/forgotPassword
 * will send out forgotPassword email
*/
  forgotPassword: function(email){
    return fetch('/account/forgotPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value
      }),
    }).then(res => res.json())
  },
  /*
   * POST /account/registration/resend
   * will send out registration Email again
  */
  resendRegistration: function(email){
    return fetch('/account/registration/resend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value
      }),
    }).then(res => res.json())
  },
  /*
   * POST /account/registration/verify
   * will verify registration via token
  */
  verifyRegistration: function(token){
    return fetch('/account/registration/verify', {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        token: token
      }),
    })
  },

  /*
   * POST /invitation
   * teacher invites student to a course
  */
  invite: function(email, courseName){
    return fetch('/invitation/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "email": email,
        "courseName": courseName
      }),
    }).then(res => res.json())
  }

  

}
