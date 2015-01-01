'use strict';

var screenshot = require('../screenshot/screenshot'),
    join = require('path').join,
    cloudinary = require('cloudinary'),
    fs = require('fs'),
    office = require('office');

module.exports = {
  getScreenshot: function(req, res, next) {
    var url = req.body.url;
    console.log(url);
    //if it's an image, upload straight to cloudinary
    if(url.toLowerCase().search(/\.jpg|\.png|\.gif|\.bmp|\.tiff|\.ico|\.pdf|\.eps|\.psd|\.svg|\.webp/)!==-1) {
      console.log('uploading image');
      cloudinary.uploader.upload(url, function(result){
        return res.json(result);
      });
    }
    /*else if(url.toLowerCase().search(/\.xls|\.xlsx|\.ods|\.doc|\.docx|\.odt/)!==-1) {
      console.log('uploading office');
        office.parse(url, function(err, data){
          if(err) {
            throw err;
          }
          var options = {
            path: path,
            viewportWidth: '1024',
            viewportHeight: '600'
          };
          screenshot(url, options, function(err){
            if(err) {
              return next(err);
            }
            cloudinary.uploader.upload(path, function(result){
              result.resource_type = 'office';
              return res.json(result);
            });
          });         
        });
    }*/
    else {
      console.log('screenshotting a webpage');
      var path = join(__dirname + '/../tmp', Date.now() + '' + Math.floor(Math.random()*8340983) + '.png');
      var options = {
        path: path,
        viewportWidth: '1024',
        viewportHeight: '600'
      };
      screenshot(url, options, function(err){
        console.log('got to callback');
        if(err) {
          return next(err);
        }
        cloudinary.uploader.upload(path, function(result){
          fs.unlinkSync(path);
          result.resource_type = 'webpage';
          return res.json(result);
        });
      });
    }
  }
};