"use strict";
var express = require('express');
var app = express();
var bodyParser = require('body-parser')

// Serve static files (css, js, images) out of the public directory
app.use(express.static('public'));

// When we get a request with an empty path,
// send our `index.html` file.
// 
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

// Keep all our chats in an array and populate it
// with some starter messages.
// 
var chats = ['first message', 'second message'];

// When we receive an HTTP GET request like `/chats/2`,
// send an array of all the chats after index `2` in
// JSON format.
// 
app.get('/chats/:latest', function(req, res){
    try {
        var latest = parseInt(req.params.latest);
    } catch (e) {
        res.status(400);
        res.send('Bad request');
        return;
    }
    var latestChats = chats.slice(latest);
    console.log('Received requests for chats since #', latest, 'of which there are', latestChats.length);
    res.json(latestChats);
});

// When we receive a POST request to `/chats`, parse
// any submitted forms and push the new chats onto 
// our `chats` array. Also accept JSON.
// 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.post('/chats', function(req, res){
    var newMessage = req.body.message;
    if(newMessage && newMessage.length > 0){
        console.log('Received new chat message: ', newMessage);
        chats.push(newMessage);
    }
    res.end();
})

// Start-up the application
// 
var port = process.env.PORT || 3000;
app.listen(port, function () {
    var url = 'http://localhost:' + port;
    if (process.env.C9_HOSTNAME) {
        url = 'https://' + process.env.C9_HOSTNAME;
    }
    console.log('Chat app running at ', url);
});