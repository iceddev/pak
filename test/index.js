'use strict';

var lab = exports.lab = require('lab').script();
var code = require('code');

var Pak = require('../');

function plugin(cb){
  cb(null, 'test');
}

lab.experiment('Pak', function(){

  var pak;

  lab.beforeEach(function(done){
    pak = new Pak();
    done();
  });

  lab.test('#register', function(done){
    pak.register(plugin, function(){
      done();
    });
  });
});
