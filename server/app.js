'use strict';

var express = require('express'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    flash = require('connect-flash'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    http = require('http'),
    Sockets = require('./sockets/sockets');
    
mongoose.connect(process.env.MONGOHQ_URL);
var mongoStore = new MongoStore({
    mongoose_connection: mongoose.connection,
    auto_reconnect: true
});

var app = express();
app.set('port', process.env.C9 ? process.env.PORT : 23232)
.use(compression())
.use(morgan('dev'))
.use(cookieParser())
.use(bodyParser.json())
.use(bodyParser.urlencoded({extended:true}))
.use(session({
    secret:process.env.SESSION_SECRET,
    saveUninitialized:true,
    resave:true,
    store:mongoStore
}))
.use(passport.initialize())
.use(passport.session())
.use(flash())

.set('phantom', 'phantomjs')
.set('screenshots', '/tmp')
.set('default viewport width', 1024)
.set('default viewport height', 600)
.set('colors', 3)
.set('root', __dirname);

var server = http.createServer(app);
Sockets.setup(server);

require('./config/passport')(passport);
require('./routes.js')(app, passport);
require('./angular.js')(app);

server.listen(app.get('port'), function(){
    console.log('api server listening on ' + app.get('port'));
});
