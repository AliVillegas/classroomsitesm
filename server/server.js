// Imports
const express = require('express');
const webRoutes = require('./routes/web');

// Session imports
let cookieParser = require('cookie-parser');
let session = require('express-session');
let flash = require('express-flash');
let passport = require('passport');
const cookieSession = require("cookie-session");
const cors = require("cors");

// Express app creation
const app = express();


// Configurations
const appConfig = require('./configs/app');
fs = require('fs');
const path = require('path');

var key = fs.readFileSync(path.resolve(__dirname, '../cert/key.pem'));
var cert = fs.readFileSync(path.resolve(__dirname, '../cert/cert.pem'));
// View engine configs
const exphbs = require('express-handlebars');
const hbshelpers = require("handlebars-helpers");
const multihelpers = hbshelpers();
const extNameHbs = 'hbs';
const hbs = exphbs.create({
    extname: extNameHbs,
    helpers: multihelpers
});
// Passport configurations

app.engine(extNameHbs, hbs.engine);
app.set('view engine', extNameHbs);




// Session configurations
let sessionStore = new session.MemoryStore;

app.use(flash());
app.use(
    cookieSession({
        name: "session",
        keys: [appConfig.cookie],
        maxAge: 24 * 60 * 60 * 100
    })
);


app.use(cookieParser());
require('./configs/passport');
app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: "http://classroomsmplify-20201114113648-hostingbucket-dev.s3-website-us-east-1.amazonaws.com", // allow to server to accept request from different origin
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true // allow session cookie from browser to pass through
    })
);
//app.use(express.urlencoded({ extended: true }));
let methodOverride = require('method-override')
app.use(methodOverride('_method'))
let bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // <--- Here

// Route for static files
app.use('/', express.static(__dirname + '/public'));

// Routes
app.use('/', webRoutes);
https.createServer({
    key: key,
    cert: cert,
    }, app).listen(appConfig.expressPort);
