var crypto = require('crypto');

function Hash(hashtype) {
  if(!(this instanceof Hash)) {
    return new Hash(hashtype);
  }
  this.hash = crypto.createHash(hashtype);
  return this;
}
Hash.prototype.update = function (data) {
  this.hash.update(data);
  return this.hash;
};
Hash.prototype.digest = function (type) {
  return this.h.digest(type);
}

module.exports = Hash;
