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
  const substitutions = [
    {from: 'player.7385a0c48f299495e73b.js', to: './player.7385a0c48f299495e73b.js'},
    {from: 'http://.*\.gooseelysima.com/.*\.swf', to: './ping.swf'},
    {from: 'http://.*/crossdomain\.xml', to: './crossdomain.xml'},
  ];
  const found = substitutions.find(item => req.url.match(new RegExp(item.from)));
  if(found) {
    console.log('REPLACED', req.url, 'matches', found.from, '=>', found.to);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write(fs.readFileSync(found.to));
    res.end();
  }
  else {
    console.log('served as is', req.url);
    proxy.web(req, res, { target: req.url + '?' });
  }
});

console.log("listening on port 5050")
server.listen(5050);
