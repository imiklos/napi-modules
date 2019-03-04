var fs = require('fs')
  , path = require('path')
  , join = path.join
  , dirname = path.dirname
  , exists = fs.existsSync || path.existsSync
  , defaults = {
        arrow: '\t→ '
      , compiled: 'compiled'
      , platform: process.platform
      , arch: process.arch
      , bindings: 'bindings.node'
      , try: [
          // node-gyp build/{Debug/Release}/module.node
          [ 'module_root', 'build', 'Debug', 'bindings' ]
        , [ 'module_root', 'build', 'Release', 'bindings' ]
        ]
    };

function bindings (opts) {
  // Argument surgery
  if (typeof opts == 'string') {
    var bindings = opts
  }
  opts = defaults
  opts.bindings = bindings || defaults.bindings;

  // Get the module root dir
  opts.module_root = getModuleDir(opts.bindings);

  var tries = []
    , length = opts.try.length
    , n
    , b
    , err

  for (var i = 0; i < length; i++) {
    n = join.apply(null, opts.try[i].map(function (p) {
      return opts[p] || p
    }))
    tries.push(n)
    try {
      b = require(n)
      return b
    } catch (e) {
      if (!/not found/i.test(e.message)) {
        throw e
      }
    }
  }

  err = new Error('Could not locate the bindings file. Tried:\n'
    + tries.map(function (a) { return opts.arrow + a }).join('\n'))
  err.tries = tries
  throw err
}

module.exports = exports = bindings

function getModuleDir (calling_file) {
  var fileName;

  fs.readdirSync((process.cwd() + '/node_modules/')).map(function (dir) {
    if(dir.substring(0, calling_file.length) === calling_file) {
      fileName = dir;
    }
  });

  if(fileName){
    return join(process.cwd(), '/node_modules/', fileName);
  } else {
    throw Error('Module not found: ' + calling_file)
  }
}
