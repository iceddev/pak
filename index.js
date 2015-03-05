'use strict';

var bach = require('bach');
var clone = require('lodash.clone');

function Pak(){

}

Pak.prototype._normalizePlugin = function normalizePlugin(plugin){
  var inst = this;
  var fn;
  var options;

  if(typeof plugin === 'function'){
    fn = plugin;
    options = {};
  } else {
    fn = plugin.register;
    options = plugin.options ? clone(plugin.options) : {};
  }

  return function(cb){
    return fn(inst, options, cb);
  };
};

Pak.prototype.register = function register(plugins, options, callback){
  plugins = Array.isArray(plugins) ? plugins : [plugins];

  plugins = plugins.map(this._normalizePlugin, this);

  if(typeof options === 'function'){
    callback = options;
    options = undefined;
  }

  bach.series(plugins)(callback);
};

module.exports = Pak;
