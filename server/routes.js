'use strict';

var OrgCtrl = require('./controllers/organisation'),
    TeamCtrl = require('./controllers/team'),
    InviteCtrl = require('./controllers/invite'),
    MessageCtrl = require('./controllers/message'),
    ResourceCtrl = require('./controllers/resource'),
    UserCtrl = require('./controllers/user'),
    SessionCtrl = require('./controllers/session'),
    IdeaCtrl = require('./controllers/idea'),
    ScreenshotCtrl = require('./controllers/screenshot');

module.exports = function(app, passport) {
    app.get('/api/user', isLoggedIn, function(req, res) {
        res.json({
            _id:req.user._id,
            name:req.user.name || req.user.local.email,
            image:req.user.image,
            slug:req.user.slug,
            color:req.user.color
        });
    });
    
    app.get('/api/screenshot', ScreenshotCtrl.getScreenshot);
    
    app.get('/api/organisations/user', isLoggedIn, OrgCtrl.findAllByUserId);
    app.post('/api/organisation/user', isLoggedIn, OrgCtrl.addOneByUserId);
    app.get('/api/organisation/:slug', isLoggedIn, OrgCtrl.findOneBySlug);
    
    app.get('/api/teams/user', isLoggedIn, TeamCtrl.findAllByUserId);
    app.post('/api/teams/user', isLoggedIn, TeamCtrl.addOneByUserId);
    app.get('/api/team/:slug', isLoggedIn, TeamCtrl.findOneBySlug);
    
    app.get('/api/sessions/user', isLoggedIn, SessionCtrl.findAllByUserId);
    app.get('/api/session/:slug', isLoggedIn, SessionCtrl.findOneBySlug);
    app.post('/api/session/user', isLoggedIn, SessionCtrl.addOneByUserId);
    
    app.post('/api/invite/send', isLoggedIn, InviteCtrl.sendInvite);
    app.get('/api/invite/parse/:inviteId', InviteCtrl.parseInvite);
    app.get('/api/invite/remember/:inviteId', InviteCtrl.rememberInvite);
    app.post('/api/invites/user', isLoggedIn, InviteCtrl.findAllByUserId);
    app.post('/api/invite/accept', isLoggedIn, InviteCtrl.acceptInvite);
    app.post('/api/invite/decline', isLoggedIn, InviteCtrl.declineInvite);
    
    app.post('/api/message/add', isLoggedIn, MessageCtrl.addMessage);
    app.post('/api/messages', isLoggedIn, MessageCtrl.findAllById);
    
    app.post('/api/idea/add', isLoggedIn, IdeaCtrl.addIdea);
    app.post('/api/ideas', isLoggedIn, IdeaCtrl.findAllById);
    
    app.post('/api/resource/add/url', isLoggedIn, ScreenshotCtrl.getScreenshot)
    app.post('/api/resource/add', isLoggedIn, ResourceCtrl.addResource);
    app.post('/api/resources', isLoggedIn, ResourceCtrl.findAllById);
    
    app.get('/api/user/:userId', isLoggedIn, UserCtrl.findOneById);
    app.get('/api/user/:slug/slug', isLoggedIn, UserCtrl.findOneBySlug);
    app.post('/api/user', isLoggedIn, UserCtrl.updateProfile);
    
    app.get('/api/users/team/:id', isLoggedIn, TeamCtrl.findAllTeamUsersById);
    app.get('/api/users/org/:id', isLoggedIn, OrgCtrl.findAllOrgUsersById);
    app.get('/api/users/session/:id', isLoggedIn, SessionCtrl.findAllSessionUsersById);
    //app.get('/api/users/session/:slug', isLoggedIn, SessionCtrl.findAllSessionUsersById);

    //LOGIN AUTHENTICATE/FIRST SIGNUP

    app.post('/api/signup', passport.authenticate('local-signup', {
        successRedirect: '/api/user',
        failureRedirect: '/api/user',
        failureFlash: true
    }));

    app.post('/api/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/api/twitter', passport.authenticate('twitter', {
        scope: 'email'
    }));

    app.get('/api/twitter/callback', passport.authenticate('twitter', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

    //LOGIN CONNECT ACCOUNTS
    app.get('/api/connect/local', function(req, res) {
        //send flash message
    });
    app.post('/api/connect/local', passport.authorize('local-signup', {
        successRedirect: '/',
        failureRedirect: '/login',
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
            res.redirect('/profile');
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
        res.redirect('/');
    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.status(401).send(req.flash('loginMessage'));
    }
}