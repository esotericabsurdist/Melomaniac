//==============================================================================
//
//
//
//
//
//
//==============================================================================
// app.js
//==============================================================================
                      /* Define variables */
//==============================================================================
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var app = express();
var clients = [];
var userList = [];
mongoose.connect('mongodb://melomaniac:webdev@ds050869.mlab.com:50869/melomaniac');
var db = mongoose.connection;
//socket io server =======
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
server.listen(4200); // listen for socket io traffic on port 4200 since app runs on 3000.
// mongo server===========
// mongoose.connect('mongodb://melomaniac:webdev@ds050869.mlab.com:50869/melomaniac');
// var db = mongoose.connection;
//==============================================================================





//==============================================================================
                          /* Web app set up */
//==============================================================================
//app.set('views', path.join(__dirname, 'views'));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//==============================================================================


//==============================================================================
                        /* Socket.io */
//==============================================================================
// listen for connection
io.sockets.on('connection', function(client) {

    console.log('Client connected...');

    // when a user signs in, a join_user broadcast occurs.
    client.on('new_user_logged_on', function(user){
        console.log('sign in event - username: ' + user.username);
    });

    client.on('new_message', function(message_data){
      // TODO broacast new message to all other clients, save the message data in Redis?
      // redis -> save data.
      // io.emit('new_message_announcement' message_data);
    });


});
//==============================================================================
io.sockets.on('disconnect', function(client) {
    console.log('Client disconnected...');
});
//==============================================================================








//==============================================================================

                  /* Ajax GETs and POST repsonses Defined here */

//==============================================================================
app.get('/', function(req, res){
  res.send(200, __dirname + '/public/index.html');
});
//==============================================================================
app.get('/index', function(req, res){
  res.send(200, __dirname + '/public/index.html');
});
//==============================================================================
app.post('/register', function(req, res){
  var new_user = req.body;
  console.log(new_user);

  // TODO add user to DB.
  var register_success = true;

  // tell the client if it was successful or not.
  res.json({'success': register_success});
});
//==============================================================================
app.post('/login', function(req, res){
  var user = req.body;
  console.log(user);

  // TODO verify user
  var login_success = true;

  // tell the client if it was successful or not.
  res.json({'success': login_success});

});
//==============================================================================











//==============================================================================

                  /* Error Handlers */

//==============================================================================
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(req.params);
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
//==============================================================================
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err.status + ' : ' + err.message);
  });
}
//==============================================================================
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log(err.status + ' : ' + err.message);
});
//==============================================================================
module.exports = app;
//==============================================================================
