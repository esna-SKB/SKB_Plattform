# SKB_Plattform
Programmierpraktikum Soziale Netzwerke MERN Gruppe entwickelt eine Netzwerkplattform für die SKB

Im Laufe der Woche:
- Treffen Montag 14 Uhr

- Product Owner - Emre
- Scrum Master - Luka
- Quality-Assurance Manager - Jamina
- Infrastructure Manager - Ahmed

# Run

- `SKB_Project$ npm install`
- `client$ npm install` (eventuelle!!, should accually be done from the script)
- `npm run dev`

# API

The API consists of the following endpoints:

## Acount

- post `/account/singin`
- post `/account/singup`

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

- GET `/message/:id`  
Returns one specific massage between two users

- DELETE `/message/:id`  
Deletes one specific massage between two users


## Course

- GET `/course`  
Returns all courses

- Post `/course`  
Creates a new course

- GET `/course/:id`  
Returns a specific courses by id

- PUT `/course/:id`  
Updates a specific course by id

- DELETE `/course/:id`  
Deletes a specific course by id

## Article - a Post in a Course

- GET `/course/:id/article`  
Returns all articles of a course

- Post `/course/:id/article`  
Creates a new article of a course

- GET `/course/:id/article/:aID`  
Returns a specific article of a courses by aID

- PUT `/course/:id/article/:aID`  
Updates a specific article of a course by aID

- DELETE `/course/:id/article/:aID`  
Deletes a specific article of a course by aID

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
	"msgID": "id",
	"fromUser": "username",
	"toUser": "username",
	"text": "",
	"created_at": "date"
}
```
## Course

A course is a JSON Object like this:

```json
{
	"courseID": "id",
	"name": "coursename",
	"teacher": "username",
	"description": ""
}
```
## Article

A article is a JSON Object like this:

```json
{
	"aID": "id",
	"courseID": "courseID",
	"headline": "heading",
	"author": "username",
	"text": "",
	"created_at": "date"
}
```

### Response

Response Object of our _API_ 
Response is a JSON Object like this:

```json
{
	"success": "bool",
	"message": "description"
}
```