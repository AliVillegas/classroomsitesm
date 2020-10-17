// Imports
const express = require('express');
const webRoutes = require('./routes/web');

// Session imports
let cookieParser = require('cookie-parser');
let session = require('express-session');
let flash = require('express-flash');
let passport = require('passport');

// Express app creation
const app = express();


// Configurations
const appConfig = require('./configs/app');

// View engine configs
const exphbs = require('express-handlebars');
const hbshelpers = require("handlebars-helpers");
const multihelpers = hbshelpers();
const extNameHbs = 'hbs';
const hbs = exphbs.create({
    extname: extNameHbs,
    helpers: multihelpers
});
app.engine(extNameHbs, hbs.engine);
app.set('view engine', extNameHbs);

// Routes
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header("credentials", "true"); // allow session cookie from browser to pass through
    next();
});


// Session configurations
let sessionStore = new session.MemoryStore;
app.use(cookieParser());
app.use(session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    rolling: true,
    saveUninitialized: true,
    resave: 'true',
    secret: appConfig.secret
}));
app.use(flash());

// Passport configurations
require('./configs/passport');
app.use(passport.initialize());
app.use(passport.session());

// Receive parameters from the Form requests
//app.use(express.urlencoded({ extended: true }));
let methodOverride = require('method-override')
app.use(methodOverride('_method'))
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// Route for static files
app.use('/', express.static(__dirname + '/public'));

// Routes
app.use('/', webRoutes);

// App init
app.listen(appConfig.expressPort, () => {
    console.log(`Server is listenning on ${appConfig.expressPort}! (http://localhost:${appConfig.expressPort})`);
});