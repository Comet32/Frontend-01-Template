const http = require('http')

// Returns content-type = text/plain
const server = http.createServer((req, res) => {
  console.log('request')
  // console.log(req.header("X-Foo2"));
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(
  `<html maaa=a>
  <head>
    <style>
  body div #myid{
    width:100px;
    background-color:#ff5000;req.header
  }
  body div img {
    width:30px;
    background-color:#ff1111;
  }
    </style>
  </head>
  <body>
    <div>
      <img id="myid"/>
      <img />
    </div>
  </body>
  </html>
  `);
});

server.listen(8088);
