var process = require('process');
exports.home = function () {
  return process.env.HOME;
};
