var express = require('express');
var connect = require('connect');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./app/config/database'); // get db config file
var port = process.env.PORT || 8080;

// get our request parameters
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

// log to console
app.use(morgan('dev'));

// Use the passport package in our application
app.use(passport.initialize());

// demo Route (GET http://54.226.115.31:8080)
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://54.226.115.31:' + port + '/api');
});

// connect to database
mongoose.Promise = global.Promise;
mongoose.connect(config.database);

app.use(connect.cookieParser());
app.use(connect.logger('dev'));
app.use(connect.bodyParser());

app.use(connect.json());  
app.use(connect.urlencoded());

// Load API routes
var userRoutes = require('./app/routes/user');
var gymRoutes = require('./app/routes/gym');
var trainerRoutes = require('./app/routes/trainer');
var nutritionistRoutes = require('./app/routes/nutritionist');
var imageRoutes = require('./app/routes/images');

app.use('/', userRoutes);
app.use('/', gymRoutes);
app.use('/', trainerRoutes);
app.use('/', nutritionistRoutes);
app.use('/', imageRoutes);

// require('./routes/routes.js')(app);

// Start the server
app.listen(port);
console.log('Tariloredfit started at : http://54.226.115.31:' + port);