//this module gives you all 'fetch'-requests to the express Server
//include "const api = require('../api');" in your component &
//use the function via api.functionname..
//in almost all cases the function returns a json object

module.exports = {
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
updateUser: function(email, firstname, lastname, newEmail, isTeacher, isAdmin, isValide){
  return fetch('/user/' + email, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      firstname: firstname,
      lastname: lastname,
      email: email,
      isTeacher: isTeacher,
      isAdmin: isAdmin,
      isValide: isValide
    }),
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
    return fetch('/user/course', {
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
    .then(res => res.json())
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
   * PUT /course/:name
   * updates a course object
  */
  updateCourse: function(courseName, newCourseName, teacherEmail, description){
    return fetch('/account/signup', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: newCourseName,
        teacher: teacherEmail,
        description: description,
      }),
    })
    .then(res => res.json())
  },
  /*
   * DELETE /course/:name
   * deletes a course object
  */
  getCourse: function(courseName){
    return fetch('/course' + courseName, {
      method: 'DELETE'
      })
    .then(res => res.json())
  },

//ARTICLES

/*
 * GET /article/course/:courseName
 * returns a list of all articles of a courses
*/
  getAllArticlesOfCourse: function(courseName){
    return fetch('/article/course/'+courseName, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }})
    .then(res => res.json())
  },

  /*
   * POST /article/course/:courseName
   * creates a new article
  */
    createArticle: function(courseName, headline, author, text, created_at){
      return fetch('/article/course/'+courseName, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          course: courseName,
          headline: headline,
          author: author,
          text: text,
          created_at: created_at,
        }),
      })
      .then(res => res.json())
    },

  /*
   * GET /article/id
   * returns an article object
  */
  getArticle: function(articleId){
    return fetch('/article' + articleId, {
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
  getCourse: function(articleId){
    return fetch('/course' + articleId, {
      method: 'DELETE',
      })
    .then(res => res.json())
  },

//TIMELINE
/*
 * GET /user/:email/course/article
 * returns a list of all articles of a user (for the timeline)
*/
getTimelineArticles: function(email){
  return fetch('/user' + email + '/course/article', {
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
 * POST /account/resetPassword
 * resets the password of an Account
*/
  resetPassword: function(userId, signInPassword){
    return fetch('/account/resetPassword', {

      method: 'POST',
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
  }




}
