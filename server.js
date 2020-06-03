var path = require('path');
var express = require('express');
var userData = require('./userData');

var app = express();
var port = process.env.PORT || 3000;

var userNum = -1;

app.use(express.static('public'));

app.get('/', function (req, res, next) {
    res.status(200).sendFile(path.join(__dirname, 'public', 'landing.html'));
});

app.get('/landing.html', function (req, res, next) {
    res.status(200).sendFile(path.join(__dirname, 'public', 'landing.html'));
});

app.get('/checking/:credentials', function (req, res, next) {
    userNum = -1;
    var creds = req.params.credentials;
    var userInput = creds.split("_");
    for(i = 0; i < userData.length; i++) {
        if (userInput[0] == userData[i][0] && userInput[1] == userData[i][1]) {
            userNum = i;
            console.log("index", i);
        }
    }
    
    if (userNum == -1) {
        console.log("invalid username or password");
	res.status(200).sendFile(path.join(__dirname, 'public', 'landing.html'))
    } else {
	res.status(200).sendFile(path.join(__dirname, 'public', 'mainShop.html'));
    }
});

app.get('*', function (req, res) {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(port, function () {
    console.log("Server is listening on port", port);
});
