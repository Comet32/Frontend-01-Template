const http = require('http');
const fs = require('fs');
const archiver = require('archiver');

let packName = './package';

// fs.stat(filePath, (error, stat) => {
const options = {
  host: 'localhost',
  port: 8080,
  path: '/?filename=' + 'package.zip',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
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

// write data to request body
// let readStream = fs.createReadStream('./cat.jpg');
// readStream.pipe(req);
// readStream.on('end', () => {
//   req.end();
// });

// });
