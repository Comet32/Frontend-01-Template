const http = require('http');
const fs = require('fs');
const archiver = require('archiver');
const child_process = require('child_process');

let port = 8080;
let packName = './dist';

// fs.stat(filePath, (error, stat) => {

let redirect_url = 'http://enxiao.io:8088/auth/expert?id=123';

child_process.exec(
  `exec open 'https://github.com/login/oauth/authorize?client_id=Iv1.fa2947b3f166f1ab&redirect_url=${redirect_url}&scope=read%3Auser&state=123abc'`,
);

const server = http.createServer((request, res) => {
  let result = request.url.match(/token=([^&]+)/);

  if (!result) return;

  let token = result[1];

  const options = {
    host: 'localhost',
    port: 8088,
    path: '/?filename=' + 'package.zip',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      token,
    },
  };

  const req = http.request(options);

  req.on('error', (e) => {
    console.error('problem with request', e.message);
  });

  let archive = archiver('zip', {
    zlib: { level: 9 }, // Sets the compression level.
  });

  // 对 packName 目录打包
  archive.directory(packName, false);

  archive.finalize();

  // 将 archive 中的流输送到 req 中
  archive.pipe(req);

  archive.on('end', () => {
    req.end();
    console.log('publish success');
    // 关闭服务器
    res.end('publish success!!');
    server.close();
  });

});

server.listen(port);

// write data to request body
// let readStream = fs.createReadStream('./cat.jpg');
// readStream.pipe(req);
// readStream.on('end', () => {
//   req.end();
// });

// });
