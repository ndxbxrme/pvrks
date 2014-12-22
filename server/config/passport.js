var LocalStrategy = require('passport-local').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    User = require('../models/user'),
    Toolkit = require('../toolkit'),
    Please = require('pleasejs'),
    emojis = require('../config/emojis'),
    cloudinary = require('cloudinary');
    
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
    
module.exports = function(passport) {
  passport.serializeUser(function(user, done){
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });    
  //LOCAL
  
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },function(req, email, password, done){
    process.nextTick(function(){
      User.findOne({'local.email': email}, function(err, user){
        if(err) {
          return done(err); 
        }
        if(user) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken.')); 
        }
        else {
          var name = email.split('@')[0];
          Toolkit.findSlug(User, name, '', function(slug){
            cloudinary.uploader.upload('https://raw.githubusercontent.com/twitter/twemoji/gh-pages/72x72/' + emojis[Math.floor(Math.random() * emojis.length)], function(result){
              var newUser = new User();
              newUser.local.email = email;
              newUser.local.password = newUser.generateHash(password);
              newUser.name = name;
              newUser.slug = slug;
              newUser.email = email;
              newUser.color = Please.make_color({saturation:0.1});
              newUser.side = Math.floor(Math.random() * 2)===0;
              newUser.image = result.public_id;
              newUser.save(function(err){
                if(err) {
                  throw err; 
                }
                return done(null, newUser);
              });
            });
          });
        }
      });
    }); 
  }));
  
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, email, password, done){
    User.findOne({'local.email':email}, function(err, user){
      if(err) {
        return done(err); 
      }
      if(!user) {
        return done(null, false, req.flash('loginMessage', 'No user found')); 
      }
      if(!user.validPassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Wrong password')); 
      }
      return done(null, user);
    });
  }));
  
  //TWITTER
  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK,
    passReqToCallback: true
  }, function(req, token, tokenSecret, profile, done){
    process.nextTick(function(){
      if(!req.user) {
        User.findOne({ 'twitter.id': profile.id}, function(err, user) {
          if(err) {
            return done(err);
          }
          if(user) {
            if(!user.twitter.token) {
              user.twitter.token = token;
              user.twitter.username = profile.username;
              user.twitter.displayName = profile.displayName;
              //user.name = profile.displayName;
              //user.image = profile._json.profile_image_url_https;
              user.save(function(err) {
                if(err) {
                  throw err; 
                }
                return done(null, user);
              });
            }
            return done(null, user); 
          }
          else {
            Toolkit.findSlug(User,profile.displayName,'',function(slug){
              cloudinary.uploader.upload(profile._json.profile_image_url_https, function(result){
                var newUser = new User();
                newUser.twitter.id = profile.id;
                newUser.twitter.token = token;
                newUser.twitter.username = profile.username;
                newUser.twitter.displayName = profile.displayName;
                newUser.name = profile.displayName;
                newUser.email = profile.email;
                newUser.slug = slug;
                newUser.color = Please.make_color({saturation:0.1});
                newUser.side = Math.floor(Math.random() * 2)===0;
                newUser.image = result.public_id;
                newUser.save(function(err){
                  if(err) {
                    throw err; 
                  }
                  return done(null, newUser);
                });
              });
            });
          }
        });
      }
      else {
        var user = req.user;
        user.twitter.id = profile.id;
        user.twitter.token = token;
        user.twitter.username = profile.username;
        user.twitter.displayName = profile.displayName;
        //user.name = profile.displayName;
        //user.image = profile._json.profile_image_url_https;
        user.save(function(err) {
          if(err) {
            throw err; 
          }
          return done(null, user);
        });
      }
    });
  }));
};