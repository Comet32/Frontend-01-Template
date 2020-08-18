const http = require('http');
const fs = require('fs');
const unzipper = require('unzipper');

// Create an HTTP server
const server = http.createServer((req, res) => {
  let matched = req.url.match(/filename=([^&]+)/);
  let filename = matched && matched[1];
  console.log(filename);
  if (!filename) return;

  let writeStream = unzipper.Extract({path: '../server/public'});

  req.pipe(writeStream);
  req.on('end', () => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('okay');
  });
});

server.listen(8080);
