/*
 * @Author: your name
 * @Date: 2020-05-09 19:49:04
 * @LastEditTime: 2020-05-09 22:13:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /week05/client.js
 */
const net = require('net');

class Request {}

class Response {}

net.connect({
  host: '127.0.0.1',
  port: 80,
  onread: {
    // Reuses a 4KiB Buffer for every read from the socket.
    buffer: Buffer.alloc(4 * 1024),
    callback: function (nread, buf) {
      // Received data is available in `buf` from 0 to `nread`.
      console.log(buf.toString('utf8', 0, nread));
    },
  },
});
