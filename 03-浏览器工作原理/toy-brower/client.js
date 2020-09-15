const net = require('net');
const parser = require('./parser.js')

class Request {
  // method, url = host + port + path
  // headers
  // body: k/v
  constructor(options) {
    this.method = options.method || 'GET';
    this.host = options.host;
    this.port = options.port || 80;
    this.path = options.path || '/';
    this.body = options.body || {};
    this.headers = options.headers || {};
    // 这里就不做驼峰转 `-` 的转换了，不过做了转换可以提高开发体验
    if (!this.headers['Content-Type']) {
      this.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    // 根据 bodyText 的不同添加 bodyText 的值
    if (this.headers['Content-Type'] === 'application/json') {
      this.bodyText = JSON.stringify(this.body);
    } else if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      this.bodyText = Object.keys(this.body)
        .map((key) => `${key}=${encodeURIComponent(this.body[key])}`)
        .join('&');
    }
    // 添加'Content-Length'
    this.headers['Content-Length'] = this.bodyText.length;
  }

  toString() {
    // 注意每排的前面不能有缩进和空格
    return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers)
  .map((key) => `${key}:${this.headers[key]}`)
  .join('\r\n')}
\r
${this.bodyText}`;
  }

  send(client) {
    return new Promise((resolve, reject) => {
      const parser = new ResponseParser();
      if (client) {
        client.write(this.toString());
      } else {
        client = net.createConnection(
          {
            host: this.host,
            port: this.port,
          },
          () => {
            client.write(this.toString());
          },
        );
      }
      // 由于 TCP 连接返回的数据的流式数据，所以并不知道此 data 是否为完整的 response
      // 因为当数据量过大时会将其拆分为多个包进行连续性的发送
      // 所以，我不能直接在此事件方法中接受 data 并将其作为完整的响应数据返回给客户端
      // 我们通过一个 ResponseParse 类来做解析和拼接
      client.on('data', (data) => {
        parser.receive(data.toString()); // 将数据喂给 parser
        if (parser.isFinished) {
          resolve(parser.response);
        }
        console.log('parser.statusLine ===', parser.statusLine);
        console.log('parser.headers ===', parser.headers);
        // console.log('on data --->', data.toString());
        // resolve(data.toString());
        client.end();
      });

      client.on('error', (err) => {
        reject(err);
        client.end();
      });
    });
  }
}

class Response {}

// 处理字符流
class ResponseParser {
  constructor() {
    // 规定一些状态
    this.WAITING_STATUS_LINE = 0;
    this.WAITING_STATUS_LINE_END = 1;
    this.WAITING_HEADER_NAME = 2;
    this.WAITING_HEADER_SPACE = 3; // : 之后有空格，遇到 : 切换到此状态
    this.WAITING_HEADER_VALUE = 4;
    this.WAITING_HEADER_LINE_END = 5;
    this.WAITING_HEADER_BLOCK_END = 6;
    this.WAITING_BODY = 7;

    this.current = this.WAITING_STATUS_LINE;
    this.statusLine = '';
    this.headers = {};
    this.headerName = '';
    this.headerValue = '';
  }

  get isFinished() {
    return this.bodyParser && this.bodyParser.isFinished;
  }

  get response() {
    this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
    return {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      headers: this.headers,
      body: this.bodyParser.content.join(''),
    };
  }

  // 这里做一下简化只处理 string，而 data 会返回在 js 定义 buffer 之前由 node 自己定义的 buffer
  receive(string) {
    for (let i = 0; i < string.length; i++) {
      this.receiveChar(string.charAt(i));
    }
  }

  receiveChar(char) {
    // 处理状态行
    if (this.current === this.WAITING_STATUS_LINE) {
      // 状态行以 \r 结束
      if (char === '\r') {
        this.current = this.WAITING_STATUS_LINE_END;
        // 状态行以 \n 结束
      } else if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME;
      } else {
        this.statusLine += char;
      }
    } else if (this.current === this.WAITING_STATUS_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME;
      }
      // 处理 Headers 中的 headerName
    } else if (this.current === this.WAITING_HEADER_NAME) {
      if (char === ':') {
        this.current = this.WAITING_HEADER_SPACE;
      } else if (char === '\r') {
        this.current = this.WAITING_HEADER_BLOCK_END; // 使用这个状态吃掉一个 `\r`
        if (this.headers['Transfer-Encoding'] === 'chunked') {
          this.bodyParser = new ChunkedBodyParser();
        }
      } else {
        this.headerName += char;
      }
    } else if (this.current === this.WAITING_HEADER_SPACE) {
      if (char === ' ') {
        this.current = this.WAITING_HEADER_VALUE;
      }
    } else if (this.current === this.WAITING_HEADER_VALUE) {
      // 以 \r 作为分界符
      if (char === '\r') {
        this.current = this.WAITING_HEADER_LINE_END;
        this.headers[this.headerName] = this.headerValue;
        this.headerName = '';
        this.headerValue = '';
      } else {
        this.headerValue += char;
      }
    } else if (this.current === this.WAITING_HEADER_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME;
      }
    } else if (this.current === this.WAITING_HEADER_BLOCK_END) {
      if (char === '\n') {
        this.current = this.WAITING_BODY;
      }
    } else if (this.current === this.WAITING_BODY) {
      this.bodyParser.receiveChar(char);
    }
  }
}

class ChunkedBodyParser {
  constructor() {
    this.WAITING_LENGTH = 0;
    this.WAITING_LENGTH_LINE_END = 1;
    this.READING_CHUNK = 2;
    this.WAITING_NEW_LINE = 3;
    this.WAITING_NEW_LINE_END = 4;

    this.length = 0;
    this.content = []; // 使用数组而不使用字符串，是因为字符串做加和运算性能较差
    this.isFinished = false;

    this.current = this.WAITING_LENGTH;
  }

  receiveChar(char) {
    // console.log('char', JSON.stringify(char))
    if (this.current === this.WAITING_LENGTH) {
      if (char === '\r') {
        if (this.length === 0) {
          console.log('this.content', this.content);
          this.isFinished = true;
        }
        this.current = this.WAITING_LENGTH_LINE_END;
        // else 部分为在此状态下要做的操作，比如这里是添加 length
      } else {
        this.length *= 16; // 长度是 16 进制
        // this.length += char.charCodeAt(0) - '0'.charCodeAt(0); // 相减可以得到数字
        this.length += parseInt(char, 16);
      }
    } else if (this.current === this.WAITING_LENGTH_LINE_END) {
      if (char === '\n') {
        this.current = this.READING_CHUNK;
      }
    } else if (this.current === this.READING_CHUNK) {
      this.content.push(char);
      this.length--;
      if (this.length === 0) {
        this.current = this.WAITING_NEW_LINE;
      }
    } else if (this.current === this.WAITING_NEW_LINE) {
      if (char === '\n') {
        this.current = this.WAITING_NEW_LINE_END;
      }
    } else if (this.current === this.WAITING_NEW_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_LENGTH;
      }
    }
  }
}

void (async function () {
  let request = new Request({
    method: 'POST',
    host: '127.0.0.1',
    port: '8088',
    path: '/',
    headers: {
      'X-Foo2': 'customer',
    },
    body: {
      name: 'harry',
    },
  });

  const response = await request.send();
  console.log('response', response);
})();

// const client = net.createConnection({ host: '127.0.0.1', port: 8088 }, () => {
//   // 'connect' listener.
//   console.log('connected to server!');
//   // client.write('world!\r\n'); // 我们的服务不认识这个字符，所以返回了 HTTP/1.1 400 Bad Request
//   let request = new Request({
//     method: 'POST',
//     host: '127.0.0.1',
//     port: '8088',
//     path: '/',
//     headers: {
//       'X-Foo2': 'customer',
//     },
//     body: {
//       name: 'harry',
//     },
//   });
//   console.log('request.toString()\n\r', request.toString());
//   client.write(request.toString());
// });

// client.on('data', (data) => {
//   console.log(data.toString());
//   client.end();
// });

// client.on('end', () => {
//   console.log('disconnected from server');
// });
