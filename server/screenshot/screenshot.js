var exec = require('child_process').exec,
    script = __dirname + '/rasterize.js',
    bin = 'phantomjs';
    
module.exports = function(url, options, fn) {
  console.log('i want to exec ' + url);
  console.dir(options);
  var cmd = [bin, script, url];
  cmd.push(options.path);
  cmd.push(options.viewportWidth + 'x' + options.viewportHeight);
  cmd = cmd.join(' ');
  exec(cmd, fn);
}