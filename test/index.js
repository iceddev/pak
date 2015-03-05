'use strict';

var lab = exports.lab = require('lab').script();
var code = require('code');

var Pak = require('../');

lab.experiment('Pak', function(){

  var pak;

  function plugin(app, opts, cb){
    code.expect(app).to.equal(pak);
    code.expect(opts).to.deep.equal({});
    cb();
  }

  var options = {
    my: 'option'
  };

  function withOptions(app, opts, cb){
    code.expect(app).to.equal(pak);
    code.expect(opts).to.deep.equal(options);
    cb();
  }

  var pluginWithOptions = {
    register: withOptions,
    options: options
  };

  var pluginWithoutOptions = {
    register: plugin
  };

  lab.beforeEach(function(done){
    pak = new Pak();
    done();
  });

  lab.test('#register', function(done){
    pak.register(plugin, done);
  });

  lab.test('#register with options', function(done){
    // we aren't using options yet
    pak.register(plugin, {}, done);
  });

  lab.test('#register with object including options', function(done){
    pak.register(pluginWithOptions, done);
  });

  lab.test('#register with object without options', function(done){
    pak.register(pluginWithoutOptions, done);
  });

  lab.test('#register with array of plugins', function(done){
    pak.register([plugin, pluginWithOptions], done);
  });
});
