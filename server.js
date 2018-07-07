'use strict';
const port = 5000;
const express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const cors = require('cors');
var methodOverride = require('method-override');

const http = require('http');
var socketIO = require('socket.io');
const messagePort = port+1;
const Message = require('./models/message');



mongoose.connect('mongodb://localhost/esna')
//var esna_db = mongodb.MongoClient.connect('mongodb://localhost:27017');

const app = module.exports = express();

const messageServer = http.createServer(app);
const io = socketIO(messageServer)

io.on('connection', socket => {
	console.log("user connected");

	socket.on('send message', (message) => {
		console.log("Von: "+message.fromUser+" Zu: "+message.toUser+" Text: "+message.text);
		var d = new Date();
		const newMessage = new Message();
		newMessage.fromUser = message.fromUser;
		newMessage.toUser = message.toUser;
		newMessage.text = message.text;
		newMessage.created_at = d.getTime();

		newMessage.save(function(err){
			if(err) handleError(err);
			else {
			return;
			}
		});
		io.sockets.emit("send message", newMessage);
	})

	socket.on('disconnect', () => {
    console.log('user disconnected')
  })
});

messageServer.listen(messagePort, () => console.log(`For Messages listening on port ${messagePort}`))

// just middlewears
// I don't know what this does, but it doesn't work without it
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(require('./routes'));
app.use(methodOverride());


var server = app.listen(port, () => `Server running on port ${port}`);

module.exports.server = server;
