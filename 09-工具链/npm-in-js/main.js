const npm = require('npm');

let config = {
  name: 'npm-in-js',
  version: '1.0.0',
  description: '',
  main: 'index.js',
  scripts: {
    test: 'echo "Error: no test specified" && exit 1',
  },  
  keywords: [],
  author: '',
  license: 'ISC',
  dependencies: {
    npm: '^6.14.7',
  },
};

let keys = Object.getOwnPropertyNames(npm);

console.log('keys', keys);

// node 标准的 callback
 npm.load(config, (err) => {
  npm.install('webpack', (err) => {
    console.log(err);
  });
});
['ac', 'acc', 'acce', 'acces', 'access', 'add', 'add-', 'add-u', 'addU', 'add-us', 'addUs', 'add-use', 'addUse', 'add-user', 'addUser', 'addu', 'addus', 'adduse', 'adduser', 'ap', 'api', 'apih', 'apihe', 'apihel', 'apihelp', 'aud', 'audi', 'audit', 'aut', 'auth', 'autho', 'author', 'bi', 'bu', 'bug', 'bugs', 'c', 'ca', 'cac', 'cach', 'ci', 'cit', 'clean-install', 'cleanInstall', 'clean-install-', 'cleanInstall-', 'clean-install-t', 'cleanInstallT', 'clean-install-te', 'cleanInstallTe', 'clean-install-tes', 'cleanInstallTes', 'clean-install-test', 'cleanInstallTest', 'com', 'comp', 'compl', 'comple', 'complet', 'completi', 'completio', 'completion', 'con']
