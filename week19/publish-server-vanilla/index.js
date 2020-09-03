const http = require('http');
const fs = require('fs');
const unzipper = require('unzipper');
const https = require('https');

// Create an HTTP server
const server = http.createServer((req, res) => {
  if (req.url.match(/^\/auth/)) {
    return auth(req, res);
  }

  // 处理遇到请求非路径资源，比如 favicon.icon
  // if (!req.url.match(/^\//)) {
  //   res.writeHead(404, { 'Content-Type': 'text/plain' });
  //   res.end('not found');
  // }

  let matched = req.url.match(/filename=([^&]+)/);
  let filename = matched && matched[1];
  if (!filename) return;

  const options = {
    hostname: 'api.github.com',
    port: 443,
    path: '/user',
    method: 'GET',
    headers: {
      Authorization: 'token ' + req.headers.token,
      'User-Agent': 'toy-cat-publish-tool',
    },
  };

  const request = https.request(options, (response) => {
    console.log('received response');
    let body = '';
    // 由于返回的数据会被分段，因此需要在外层声明一个 body 来接收
    response.on('data', (d) => {
      body += d.toString();
    });
    response.on('end', (d) => {
      let user = JSON.parse(body);
      // 对 user 进行权限检查，比如使用 user 中的 id 信息鉴权，这会设计到存表一类的操作。
      let writeStream = unzipper.Extract({ path: '../server/public' });

      req.pipe(writeStream);
      req.on('end', () => {
        console.log('zip end'); 
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('publish okay');
      });
    });
  });
});

function auth(req, res) {
  let matchRes = req.url.match(/code=([^&]+)/);

  let code = matchRes ? matchRes[1] : null;
  let state = '123abc';
  let client_secret = '268ee4dccc6db871225a4ac50f29cffbc27a7ba6';
  let client_id = 'Iv1.fa2947b3f166f1ab';
  let redirect_uri = encodeURIComponent('http://localhost:8080/auth/expert');

  let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`;

  const options = {
    hostname: 'github.com',
    port: 443,
    path: `/login/oauth/access_token?${params}`,
    method: 'POST',
  };

  const request = https.request(options, (result) => {
    result.on('data', (d) => {
      let matchedRes = d.toString().match(/access_token=([^&]+)/);
      if (matchedRes) {
        let token = matchedRes[1];
        console.log('token', token);
        res.writeHead(200, { access_token: token, 'Content-Type': 'text/html' });
        res.end(`<a href="http://localhost:8080/publish?token=${token}">publish</a>`);
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('auth error');
      }
    });
  });

  request.on('error', (e) => {
    console.error(e);
  });

  request.end();
}

server.listen(8081);
