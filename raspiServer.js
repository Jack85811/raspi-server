var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sudo = require('sudo');
app.use(bodyParser.json());       // to support JSON-encoded bodies

// JSON API
app.post('/switchon',function (req,res){
    console.log(req.body);
    var systemCode = req.body.systemCode;
    var socketNumber = req.body.socketNumber;
    var status = req.body.status;
    var options = {
        cachePassword: true,
        prompt: 'raspberry',
        spawnOptions: { /* other options for spawn */ }
    };
    var child = sudo(['sudo /home/pi/raspberry-remote/send '+systemCode+ ' '+socketNumber+ ' ' + status], options);
    child.stdout.on('data', function (data) {
        console.log(data.toString());
    });
    console.log('sudo /home/pi/raspberry-remote/send '+systemCode+ ' '+socketNumber+ ' ' + status);



    res.send("ok");

});


// Start server
var port= 8081;
app.listen(port);
console.log("Server running at http://localhost:" + port );
