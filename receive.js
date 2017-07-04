var rpi433    = require('rpi-433'),
    rfSniffer = rpi433.sniffer({
      pin: 27,                     //Snif on GPIO 2 (or Physical PIN 13)
      debounceDelay: 500          //Wait 500ms before reading another code
    }),
    rfEmitter = rpi433.emitter({
      pin: 0,                     //Send through GPIO 0 (or Physical PIN 11)
      pulseLength: 350            //Send the code with a 350 pulse length
    });
var http = require('http');

// Receive (data is like {code: xxx, pulseLength: xxx})
rfSniffer.on('data', function (data) {
  console.log('Code received: '+data.code+' pulse length : '+data.pulseLength);
  if (data.equals("71007")) {
    console.log("hola");
    var options = {
        host: 'http://192.168.0.27',
        port: 8083,
        path: '/playsound',
        method: 'POST',
        headers: {
            'Content-Type': 'application/text'
        }
    };

    var req = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log("body: " + chunk);
        });
    });
    req.write(data);
    req.end();
  }
});
