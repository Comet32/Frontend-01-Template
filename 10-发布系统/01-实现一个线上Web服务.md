# 2. 发布系统 | 实现一个线上 Web 服务

[toc]

这节课进入全新的阶段—— `publish`

我们先要在虚拟机上安装 node，可以参考这篇文章 [Ubuntu18.04 Install Node.js Npm](https://www.jianshu.com/p/f3dad64d896a) 

会先用 `express` 在本地开发机器中搭建一个基本的 web 服务进行调试，然后再放到虚拟机中。



## 搭建 `express` 服务器

### Hello world

首先，创建 `server` 目录来作为服务器项目，在目录中安装 `express` ：

```shell
npm i express
```

然后，根据官方示例 [Hellow world example](https://expressjs.com/en/starter/hello-world.html) 启动服务器。先创建文件 `index.js` 再编写如下代码：

```js
const express = require('express')
const app = express()
const port = 8088

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

接着，`node index.js` 启动服务器，之后我们就在浏览器中通过访问 `http://localhost:8088/` 来获取服务器的响应。



### Express application generator

接着我们跟着[官方示例](https://expressjs.com/en/starter/generator.html)通过 `express-generator` 来快速搭建项目的整个目录结构。（这个 `generator` 和我们用 `yeoman` 做的 `generator` 相似）

执行 `npx express-generator` 自动生成文件与目录：

```
.
├── app.js
├── bin
│   └── www
├── package-lock.json
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.jade
    ├── index.jade
    └── layout.jade
```

- 这是通过 `tree -I node_modules` 自动生成的树型文本，方便我们了解我们的目录结构。

- 我们会将 `views` 目录中的 `jade` 模版文件替换为 `html` ，因为我们是做静态发布，少量的支持模版能力。除此之外，我们也可以将 `html` 文件放到 `public` 目录中，这样也可以直接访问这个目录中的文件路径来获取资源。



## 搭建发布系统 `publish-server`

和搭建服务器相同，首先我们要创建 `publish-server` 目录作为项目，然后通过 `express-generator` 自动生成目录和文件：

```shell
npx express-generator --no-view
```

- `--no--view` 是不使用模版引擎的选项。

生成的目录：

```
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── index.html
│   ├── javascripts
│   └── stylesheets
│       └── style.css
└── routes
    ├── index.js
    └── users.js
```

- 没有使用模版引擎的项目结构中会在 `public` 中生成 `index.html` ，这样就可以在访问根路径时返回这个文件。

之后我们在生成的文件 `./bin/www` 中将应用默认端口更改为 `8081`：

```js
var port = normalizePort(process.env.PORT || '8081');
app.set('port', port);
```

默认情况下，服务器启动之后带有界面，但是 `publisher` 是不需要 UI 界面的，因为 `publisher` 大概率是和工具链做对接。

这里需要完成两个事情，一个是 Auth，对用户身份的验证，毕竟不是谁都能够进行发布操作；二是我们要将接收的提交上来的文件存到一个地方。除了这两件事情之外，我们甚至可以做版本管理的功能。

会用到 node [File system](https://nodejs.org/dist/latest-v12.x/docs/api/fs.html) API，尝试在 `publish-server` 中向 `server` 中添加文件，然后第二步是通过 http 请求去指定这个文件的内容，第三步用编写的命令行工具 `publish-tool` 去访问 `publish-server` ，然后再让 `publish-server` 根据 `publish-tool` 中的东西去 `server` 中添加文件。这里没有数据库和模版东西。前端的 server 就是这样的平易近人。。。

比如我们可以像如下这样启动 `publish-server` 在 `server` 中创建文件：

```js
fs.writeFileSync("../server/public/1.html", 'hello server');
```

但是在生成环境中我们不能使用 `writeFileSync` API，所以就需要进行一些改造。

> 我们可以通过断点或是打印来看一下接收到客户端访问时的 `req` 是什么，`req` 是 `IncomingMessage` 对象，在 node 中是流式的。



### 补充

- `nginx` 在这里可以代替 `server` 。一般的公司 `nginx` 是作为反向代理，而不是主 `server`。
- `publish-server` 是接收内网开发的请求， `server` 是接收用户访问的请求。

- 如果是多机部署，`server` 就会变得很复杂，`publish-server` 和 `server` 会处在两个不同的集群中，他们之间会进行 RPC（远程通信），而且 `publish-server` 只有一两台，而 `server` 有几十台的情况。



## 开发 `publish-tool` 命令行工具

接下来要用 `publish-tool` 从客户端中获取文件名和内容，然后将其传递给 `publish-server` ，将它们进行联系配对。然后将 `publish-tool` 放到 toolchain 中作为工具链的最后一环。

### 使用 `publish-tool` 指定文件名

首先，我们在 `publish-server/routes/index.js` 文件中编写如下代码：

 ```js
var express = require('express');
var router = express.Router();
let fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
  let serverPath = '../server/public';
  fs.writeFileSync(serverPath + req.query.filename, 'hello world');
});

module.exports = router;
 ```

- 当接收到访问 `/` 根路径的 `get` 请求时，我们会将 `query` 为 `filename` 的值作为文件名，`'hello world'` 作为内容在 `../server/public` 下创建一个文件。



在 `publish-tool` 项目目录中，我们创建 `publish.js` 文件，编写如下代码：

```js
const http = require('http');

const options = {
  host: 'localhost',
  port: 8080,
  path: '/?filename=x.html',
  method: 'GET',
};

// make a request
const req = http.request(options);
req.end();
```

- 执行 `node publish.js` 之后向 `publish-server` 发送请求



### 使用 `publish-tool` 指定内容

我们先来修改一下 `public-server/routes/index.js` 中的请求：

```js
router.post('/', function (req, res, next) {
  let serverPath = '../server/public/';
  fs.writeFileSync(serverPath + req.query.filename, req.body.content);
});
```

- 这里将内容替换为了从请求中获取的 `request.body.content` ，`body` 是已经被 `express` 将流式数据中的一个一个 `chunk` 接收并拼装好并 `parse` 之后的对象



然后修改一下 `public-tool/publish.js` 文件：

```js
const http = require('http');
const querystring = require('querystring');

const postData = querystring.stringify({
  'content': 'hello world post'
})

const options = {
  host: 'localhost',
  port: 8080,
  path: '/?filename=x.html',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'content-Length': Buffer.byteLength(postData)
  }
};

// make a request
const req = http.request(options);
req.write(postData);
req.end();
```

- 修改了 `method` 并添加了 `headers` 并写入了一串 stringify 之后的字符串 `postData` 

> application/x-www-form-urlencoded
>
> 来源：https://www.cnblogs.com/tugenhua0707/p/8975121.html
>
> **Content-Type**是指http/https发送信息至服务器时的**内容编码类型**，contentType用于表明发送数据流的类型，服务器根据编码类型使用特定的解析方式，获取数据流中的数据。
>
> **application/x-www-form-urlencoded 主要用于如下:**
> 1.1：最常见的POST提交数据方式。
> 1.2：原生form默认的提交方式(可以使用enctype指定提交数据类型)。
> 1.3：jquery，zepto等默认post请求提交的方式。

这样我们用 `publish-tool` 给 `publish-server` 发送请求，`publish-server` 在 `server/public` 中创建文件的整个流程就跑通了。

接下来，我们将正式的设计协议和修改处理接收到的文件的方式，因为接收到的文件可能是二进制的，而不是字符串，还有就是现在接收的字符串是 `express` 直接处理好的内容，而我们没有手动的进行流式处理，当传输大文件时对性能不太好。

### 使用流的方式创建文件

一般接收流式数据，需要不断的监听 `data` 事件，和 `end` 事件，每一个 `data` 事件会接收到一个 `chunk` 然后再将 `chunk` 进行拼接，文档（[Stream](https://nodejs.org/docs/latest-v12.x/api/stream.html)）示例：

```js
const server = http.createServer((req, res) => {
  // `req` is an http.IncomingMessage, which is a readable stream.
  // `res` is an http.ServerResponse, which is a writable stream.

  let body = '';
  // Get the data as utf8 strings.
  // If an encoding is not set, Buffer objects will be received.
  req.setEncoding('utf8');

  // Readable streams emit 'data' events once a listener is added.
  req.on('data', (chunk) => {
    body += chunk;
  });

  // The 'end' event indicates that the entire body has been received.
  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      // Write back something interesting to the user:
      res.write(typeof data);
      res.end();
    } catch (er) {
      // uh oh! bad json!
      res.statusCode = 400;
      return res.end(`error: ${er.message}`);
    }
  });
});
```

但是这样做很麻烦，所以我们可以使用 `pipe` （虽然我到此还不知道这是什么，主要还是应该去学习一下 node）

这里我们使用 node 自带的 http API 来实现流式处理，而不是 express 已经封装好的。新建文件 `publish-server-http/index` ，编写如下代码：

```js
const http = require('http');
const fs = require('fs');

// Create an HTTP server
const server = http.createServer((req, res) => {
  let matched = req.url.match(/filename=([^&]+)/);
  let filename = matched && matched[1];
  if (!filename) return;

  let writeStream = fs.createWriteStream('../server/public/' + filename);
  req.pipe(writeStream);
  req.on('end', () => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('okay');
  });
});

server.listen(8080);
```

- 这里用到 `req.pipe` 将 `req` 中接收到的流写到 `writeStream` 中。

接着就是重新编写一下 `publish-tool/publish.js` 文件：

```js
const http = require('http');
const fs = require('fs');

let filePath = './cat.jpg';

fs.stat(filePath, (error, stat) => {
  const options = {
    host: 'localhost',
    port: 8080,
    path: '/?filename=cat.jpg',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'content-Length': stat.size,
    },
  };

  const req = http.request(options);
  req.on('error', (e) => {
    console.error('problem with request', e.message);
  });
  // write data to request body
  let readStream = fs.createReadStream('./cat.jpg');
  readStream.pipe(req);
  readStream.on('end', () => {
    req.end();
  });
});

```

- 读取项目中的 `cat.jpg` 文件，然后依然是使用 `pipe` 将流写入 `req` 中发送给 `publish-server` 



到此 `publish-tool` 就可以将任何的文件传输到 `server` 中。

#### 补充

- `publish-server` 实际上是两个工具，第一个工具是和 `server` 同机部署，然后将其作为发布的渠道，相当于一个传输文件的工具，当然一般我们不会自己写。另一个承载了与 `publish-tool` 进行对接的工作。

- node 里很多 API 对于 winter 来说很坑，但 Stream 是很正确的设计，如果不使用 Stream 性能会成为很大的问题。

- `pipe` 相当于 `req.on('data')` 这种写法的快捷方式：

  ```js
  req.pipe(writeStream);
  // 相当于
  req.on('data', trunk => {
    writeStream.write(trunk);
  })
  req.on('end', trunk => {
    writeStream.end(trunk);
  })
  ```

  - 通过监听 `data` 和 `end` 事件去读取 `trunk` ，通过 `write(trunk)` 将文件写入到 `writeStream` 中。而 `pipe` 相当于将这两个流程用一个方法来完成。

- 如果你使用 `Promise` 去封装一个 `nodeJS` onData onEnd 的流，你怎么将其做成能够通过循环去访问？  因为一个 Stream 实际上是可以做成一个 async iterator 。 



### 压缩目录

现在我们的发布工具有两个问题

- 一是无法传输多个文件，但发布一个项目肯定是需要发送多个文件的。
- 二是没有对文件进行压缩，这对性能来说不太友好。

 所以，我们需要在 `publish-tool` 中用到 [archiver](https://www.npmjs.com/package/archiver) 这个包来将一个目录中的所有文件进行压缩，然后再发送给 `publish-server` ，代码如下：

```js
const archiver = require('archiver');

let packName = './package';

const options = {
  host: 'localhost',
  port: 8080,
  path: '/?filename=' + 'package.zip',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

let archive = archiver('zip', {
  zlib: { level: 9 }, // Sets the compression level.
});

// 对 packName 目录打包
archive.directory(packName, false);

archive.finalize();

const req = http.request(options);
// 将 archive 中的流输送到 req 中
archive.pipe(req);

req.on('error', (e) => {
  console.error('problem with request', e.message);
});
```

- `archive` 是一个流，所以我们可以将其 `pipe` 到 `req` 中（26 行）
- 20 行通过 `directory` 指定要打包的目录 `packName` 是位于项目中的一个目录。



#### 补充

- 是什么类型的架构需要发布平台？
  - 所有的团队都需要发布平台，除非是需要服务端套模版，你把前端代码发给服务端同学他人肉或者自动帮你发布，只要前端是独立发布的，一定有一个工具用于独立发布。
- `github` action 背后一样有一个发布的工具和动作，只是说它可以自动的帮你触发工具或是动作。 
- 我们做这个发布工具，并不是要真的做一个发布工具，而是要了解发布工具背后帮你做了哪些事，你需要考虑哪些东西。
- 这个发布工具和 `jenkins` 区别还是有点大，还没有讲到和 `jenkins` 对应的东西，`jenkins` 主要在持续集成，而不是在发布，它也是一个公用的，而我们所做的是私有的，一般来说不同的公司可能有不同的发布工具。



### 解压 `publish-server` 端的压缩包

 `server` 项目中 `public` 目录下接收到的是 `zip` 压缩文件，所以我们需要在 `publish-server` 中将从 `publish-tool` 接收到的 `zip` 文件解压之后再放到 `server` 中。

解压我们会用到 [unzipper](https://www.npmjs.com/package/unzipper) 这个包。代码如下：

```js
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
```

- 很简单，引入 `unzipper` 调用 `Extract` 方法，传入路径，之后将 `req` 中流导入 `writeStream` 中，接收完毕之后就会将其解压到 `path` 中。



下节课我们会给 `publish-tool` 添加一些实用的能力，使其能够与我们的工具链集成使用。

### 补充

- 我们这里的发布仅限于前端发布，我们前端发布一般是没有运维写脚本之类的东西的。如果运维愿意给你给脚本，那么今天写的这块发布工具就不需要了。
- 今天写的 publish 工具是工具链中的最后一环，用于将开发、调试、测试、打包之后的代码发送到服务器，在 `scripts` 中会有 `publish` 命令用于发布。并且 publish 之前也可能会有 lint 或是持续集成的步骤。







## 课程设计内容

### 参考链接：

- https://nodejs.org/docs/latest-v13.x/api/fs.html
- https://expressjs.com/en/starter/installing.html
- https://www.jianshu.com/p/f3dad64d896a

### 课后作业：

- 跟上课程进度，写完 publish-sever 和 publish-tool，完成这个发布系统。