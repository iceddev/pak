'use strict';

var bach = require('bach');

function Pak(){

}

Pak.prototype.register = function register(plugins, options, callback){
  plugins = Array.isArray(plugins) ? plugins : [plugins];

  if(typeof options === 'function'){
    callback = options;
    options = undefined;
  }

  bach.series(plugins)(callback);
};

module.exports = Pak;
