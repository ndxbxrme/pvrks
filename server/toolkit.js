'use strict';

var _s = require('underscore.string');

var doFindSlug = function doFindSlug(Obj,slug,done) {
  Obj.findOne({slug:slug})
  .exec(function(err,obj){
    if(err){
      throw err;
    }
    if(obj){
      return done(false,slug);
    }
    else {
      return done(true,slug);
    }
  })
};
var findRandomSlug = function findRandomSlug(Obj,slug,done){
  var rnd = Math.floor(Math.random() * 9999);
  Obj.findOne({slug:slug + rnd})
  .exec(function(err,obj){
    if(err){
      throw err;
    }
    if(obj) {
      findRandomSlug(Obj,slug,done);
    }
    else {
      done(slug + rnd);
    }
  })
}
module.exports = {
  findSlug: function(Obj,name,userSlug,done) {
    var slug = _s.slugify(name);
    doFindSlug(Obj,slug,function(good,slug){
      if(good) {
        done(slug);
      }
      else {
        findRandomSlug(Obj,slug,done);
        /*doFindSlug(Obj,userSlug + '-' + slug, function(good, newSlug){
          if(good) {
            done(newSlug);
          }
          else {
            findRandomSlug(Obj,slug,done);
          }
        })*/
      }
    })
  }
};