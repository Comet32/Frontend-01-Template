var express = require('express');
var router = express.Router();
let fs = require('fs');

/* GET home page. */
router.post('/', function (req, res, next) {
  let serverPath = '../server/public/';
  fs.writeFileSync(serverPath + req.query.filename, req.body.content);
});

module.exports = router;
