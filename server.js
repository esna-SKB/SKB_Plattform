'use strict';
const port = 5000;
const express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://localhost/esna')
//var esna_db = mongodb.MongoClient.connect('mongodb://localhost:27017');

const app = module.exports = express();

// just middlewears
// I don't know what this does, but it doesn't work without it
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(require('./routes'));


var server = app.listen(port, () => `Server running on port ${port}`);

module.exports.server = server; 