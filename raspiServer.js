var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sudo = require('sudo-prompt');
app.use(bodyParser.json());       // to support JSON-encoded bodies

// JSON API
app.post('/switchon',function (req,res){
    console.log(req.body);
    var systemCode = req.body.systemCode;
    var socketNumber = req.body.socketNumber;
    var status = req.body.status;
    var options = {
      name: 'Electron'
    };
    sudo.exec('sudo home/pi/raspberry-remote/send '+systemCode+ ' '+socketNumber+ ' ' + status, options, function(error, stdout, stderr) {});
    res.send("ok");

});

app.post('/get',function (req,res){
    console.log('get works');
});

// Start server
var port= 8081;
app.listen(port);
console.log("Server running at http://localhost:" + port );
