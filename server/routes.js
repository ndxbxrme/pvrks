'use strict';

var OrgCtrl = require('./controllers/organisation'),
    TeamCtrl = require('./controllers/team'),
    InviteCtrl = require('./controllers/invite'),
    MessageCtrl = require('./controllers/message');

module.exports = function(app, passport) {
    app.get('/api/user', isLoggedIn, function(req, res) {
        res.json({
            _id:req.user._id,
            name:req.user.name || req.user.local.email,
            image:req.user.image
        });
    });
    
    app.get('/api/organisations/user', isLoggedIn, OrgCtrl.findAllByUserId);
    app.post('/api/organisation/user', isLoggedIn, OrgCtrl.addOneByUserId);
    app.get('/api/organisation/:slug', isLoggedIn, OrgCtrl.findOneBySlug);
    
    app.get('/api/teams/user', isLoggedIn, TeamCtrl.findAllByUserId);
    app.post('/api/teams/user', isLoggedIn, TeamCtrl.addOneByUserId);
    app.get('/api/team/:slug', isLoggedIn, TeamCtrl.findOneBySlug);
    
    app.post('/api/invite/send', isLoggedIn, InviteCtrl.sendInvite);
    app.get('/api/invite/parse', isLoggedIn, InviteCtrl.parseInvite);
    app.get('/api/invites/user', isLoggedIn, InviteCtrl.findAllByUserId);
    app.post('/api/invite/accept', isLoggedIn, InviteCtrl.acceptInvite);
    app.post('/api/invite/decline', isLoggedIn, InviteCtrl.declineInvite);
    
    app.post('/api/message/add', isLoggedIn, MessageCtrl.addMessage);
    app.post('/api/messages', isLoggedIn, MessageCtrl.findAllById);

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