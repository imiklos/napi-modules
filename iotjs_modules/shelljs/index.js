var fs = require('fs');

exports.mkdir = function (opt, dir) {
  fs.mkdirSync(dir);
};
