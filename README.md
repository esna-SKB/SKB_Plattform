# ESNA
# SKB_Plattform
Programmierpraktikum Soziale Netzwerke MERN Gruppe entwickelt eine Netzwerkplattform für die SKB

- Product Owner - Emre
- Scrum Master - Luka
- Quality-Assurance Manager - Jamina
- Infrastructure Manager - Hung

# Run

- `SKB_Project$ npm install`
- `client$ npm install` (eventuelle!!, should accually be done from the script)
- `npm run dev`

# Test
-`npm test`

# URL
Die URL bedient folgende Seitenanfragen.

- `/` - Login/Startseite

### InnerPage
- `/courses`
- `/createcourse/`
- `/courses/:coursename`
- `/groups`
- `/groups/:groupname`
- `/user/:email`
- `/user/:email/edit/`
- `/user/:email/changepassword/`
- `/messages`
- `/messages/user/:email`
- `/calendar`
- `/settings`

### OuterPage
- `/forgotPassword`
- `/resetPassword`
- `/verify`
- `/resend`


# API

The API consists of the following endpoints:

## Acount

- POST `/account/singin`
- POST `/account/singup`

## Timeline

- GET `timeline/user/:email/course/article`
Returns all Articles for the timeline, newes posts form the useres courses

## User

- GET `/user`  
Returns all users

- POST `/user`  
Creates a new user

- GET `/user/:email`  
Returns a specific user by username

- PUT `/user/:email`  
Updates a specific user by username

- DELETE `/user/:email`  
Deletes a specific user by username

- GET `/user/:email/course`  
Returns all courses of a user



## UserSession

- GET `/userSession/:emailtoken`
Returns the token of the userSession with your registered email

- POST `/userSession/check`
Checks if User Sessoin is still active ---(if yes)---> updates the time stamp

- POST `/userSession/newtoken`
Creates a new token for an expired User Session (body needs email)

- PUT `/userSession/deleteSession`
Closes the User Session immediately


## Message - messages between users

- GET `/message`  
Returns all messages

- POST `/message`  
Creates a new massage

- GET `/message/from/:fromUser/to/:toUser`  
Returns all massages between two users

<!--- - PUT `/user/:id/message/:msgID`  
Updates a specific massage of a user by msgID --->

- DELETE `/message/from/:fromUser/to/:toUser`  
Deletes a all massages between two users

- GET `/message/:_id`  
Returns one specific massage between two users

- DELETE `/message/:_id`  
Deletes one specific massage between two users


## Course

- GET `/course`  
Returns all courses

- Post `/course`  
Creates a new course

- GET `/course/:name`  
Returns a specific courses by id

- PUT `/course/:name`  
Updates a specific course by id

- DELETE `/course/:name`  
Deletes a specific course by id

- GET `/course/:name/user`
Returns all users of a course

## Article - a Post in a Course
<!--
- GET `/article`
Returns all articles -->

- GET `/article/course/:name`
Returns all articles of a course

- Post `/article/course/:name`  

Creates a new article of a course

- GET `/article/:_id`  
Returns a specific article of a courses by aID

- PUT `/article/:_id`  
Updates a specific article of a course by aID

- DELETE `/article/:_id`  
Deletes a specific article of a course by aID

## Enrollment

- POST `enrollment/user/:email/course/:name`
When a user signs in to a course

- DELETE `enrollment/user/:email/course/:name`
When a user signs out of a course

## Invitation

- POST `invitation`
When a teacher invites a student to a course

## Group

<!--
- GET `/group/user/:email`  
Returns all groups of a user
-->
- GET `/group/course/:name`  
Returns all groups of a course

- Post `/group/course/:name`  
Creates a new goupe

- GET `/group/:_id`
Returns a specific group from a specific courses by id

- PUT `/group/:_id`  
Updates a specific group from a specific course by id

- DELETE `/group/:_id`  

Deletes a specific group from a specific course by id

#DataObjects:
- all data Objects carry a *_id*

## Enrollment

- POST `/enrollment/user/:email/course/name`
Enrolls a user in to a course

- DELETE `/enrollment/user/:email/course/name`
Signeds a user out of a course


## User

A user is a JSON Object like this:

```json
{
	"_id": "mongooseID",
	"firstname": "firstname",
	"lastname": "name",
	"email": "email",
	"password": "password",
	"isTeacher": false,
	"isAdmin": false,
	"isVerified" : false
}
```

## Message

A message is a JSON Object like this:

```json
{
	"_id": "id",
	"fromUser": "email",
	"toUser": "email",
	"text": "",
	"created_at": "date"
}
```
## Course

A course is a JSON Object like this:

```json
{
	"_id": "_id",
	"name": "coursename",
	"teacher": "{teacher-obj}(for post user the teachers email)",  
	"description": "",
	"isFree": true
}
```
## Article

A article is a JSON Object like this:

```json
{
	"aID": "_id",
	"course": "{course.obj}(post use courseName)",
	"headline": "heading",
	"author": "{user}(post use email)",
	"text": "",
	"created_at": "date"
}
```

# Other Objects:  

### Response

Response Object of our _API_
Response is a JSON Object like this:

```json
{
	"success": "bool",
	"message": "description"
}
```
