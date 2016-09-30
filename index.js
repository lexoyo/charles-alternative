/**
 * Start the proxy:
 * $ npm start
 *
 * Then use chrome extension http://www.samabox.com/projects/chrome/switchy
 * to proxy all your request to localhost:5050
 */


var http = require('http');
var httpProxy = require('http-proxy');
var fs = require('fs');

var proxy = httpProxy.createProxyServer({});
var server = http.createServer(function(req, res) {
  console.log('Asked:', req.url);
  if(req.url.indexOf('player.7385a0c48f299495e73b.js') > 0) {
    console.log('REPLACED: player.7385a0c48f299495e73b.js');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write(fs.readFileSync('./player.7385a0c48f299495e73b.js'));
    res.end();
  }
  else {
    proxy.web(req, res, { target: req.url + '?' });
  }
});

console.log("listening on port 5050")
server.listen(5050);
