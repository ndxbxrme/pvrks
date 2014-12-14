'use strict';

var OrgCtrl = require('./controllers/organisation.js');

module.exports = function(app, passport) {
    app.get('/api/user', isLoggedIn, function(req, res) {
        res.json(req.user);
    });
    
    app.get('/api/organisations/user', isLoggedIn, OrgCtrl.findAllByUserId);
    app.post('/api/organisation/user', isLoggedIn, OrgCtrl.addOneByUserId);

    //LOGIN AUTHENTICATE/FIRST SIGNUP

    app.post('/api/signup', passport.authenticate('local-signup', {
        successRedirect: '/api/user',
        failureRedirect: '/api/user',
        failureFlash: true
    }));

    app.post('/api/login', passport.authenticate('local-login', {
        successRedirect: '/api/user',
        failureRedirect: '/api/user',
        failureFlash: true
    }));

    app.get('/api/twitter', passport.authenticate('twitter', {
        scope: 'email'
    }));

    app.get('/api/twitter/callback', passport.authenticate('twitter', {
        successRedirect: '/home',
        failureRedirect: '/login'
    }));

    //LOGIN CONNECT ACCOUNTS
    app.get('/api/connect/local', function(req, res) {
        //send flash message
    });
    app.post('/api/connect/local', passport.authorize('local-signup', {
        successRedirect: '/api/user',
        failureRedirect: '/api/user',
        failureFlash: true
    }));

    app.get('/api/connect/twitter', passport.authorize('twitter', {
        scope: 'email',
        successRedirect: '/profile'
    }));

    //UNLINK ACCOUNTS
    app.get('/api/unlink/local', function(req, res) {
        var user = req.user;
        user.local.email = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('api/user');
        });
    });

    app.get('/api/unlink/twitter', function(req, res) {
        var user = req.user;
        user.twitter.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });
    app.get('/api/logout', function(req, res) {
        req.logout();
        res.redirect('/api/user');
    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.status(401).send(req.flash('loginMessage'));
    }
}