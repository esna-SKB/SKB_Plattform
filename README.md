# SKB_Plattform
Programmierpraktikum Soziale Netzwerke MERN Gruppe entwickelt eine Netzwerkplattform für die SKB

Im Laufe der Woche:
- Treffen Montag 14 Uhr

- Product Owner - Emre
- Scrum Master - Luka
- Quality-Assurance Manager - Jamina
- Infrastructure Manager - Ahmed

#Run

- `npm install`
- `npm run dev`


# API

The API consists of the following endpoints:

## User

- GET `/user`  
Returns all users

- POST `/user`  
Creates a new user

- GET `/user/:id`  
Returns a specific user by username

- PUT `/user/:id`  
Updates a specific user by username

- DELETE `/user/:id`  
Deletes a specific user by username

## Message - messages between users

- GET `/user/:id/message`  
Returns all messages of a users

- POST `/user/:id/message`  
Creates a new massage of a user

- GET `/user/:id/message/:msgID`  
Returns a specific massage of a user by msgID

- PUT `/user/:id/message/:msgID`  
Updates a specific massage of a user by msgID

- DELETE `/user/:id/message/:msgID`  
Deletes a specific massage of a user by msgID 

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
	"unsername": "id",
	"Surname": "surname",
	"Name": "name",
	"password": "password",
	"isT": false,
	"isA": false
}
```

## Message

A message is a JSON Object like this:

```json
{
	"msgID": "id",
	"fromUser": "username",
	"toUser": "username",
	"msgContent": ""
}
```
## Course

A course is a JSON Object like this:

```json
{
	"courseID": "id",
	"courseName": "coursename",
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
	"aContent": ""
}
```
