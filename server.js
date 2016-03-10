var request = require("request")

var http = require('http')
var port = process.env.PORT || 1337;
http.createServer(function (req, res) {
    request("http://www.bom.gov.au/fwo/IDT60901/IDT60901.94970.json", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var bodyObj = JSON.parse(body);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end('{"CurrentTemperature" : ' + bodyObj['observations']['data'][0]['air_temp'] + '}\n');
        }
        else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('{"CurrentTemperature" : -42}');
        }
    })
}).listen(port);