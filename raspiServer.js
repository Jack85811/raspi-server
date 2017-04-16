var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sys = require('sys')
var exec = require('child_process').exec;
var child;
app.use(bodyParser.json());       // to support JSON-encoded bodies

// JSON API
app.post('/switchon',function (req,res){
    console.log(req.body);
    var systemCode = req.body.systemCode;
    var socketNumber = req.body.socketNumber;
    var status = req.body.status;
    child = exec("pwd", function (error, stdout, stderr) {
      sys.print('stdout: ' + stdout);
      sys.print('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
    //console.log('/home/pi/raspberry-remote/send '+systemCode+ ' '+socketNumber+ ' ' + status);



    res.send("ok");

});


// Start server
var port= 8081;
app.listen(port);
console.log("Server running at http://localhost:" + port );
