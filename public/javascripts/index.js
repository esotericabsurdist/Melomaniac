//==============================================================================
//
//
//
//
//
//
//==============================================================================
// index.js
//==============================================================================



//==============================================================================
//
//            ********** Knockout Referenced Functions *********** Note, some helper functions are also referenced.
//
//==============================================================================
var login = function(){
  console.log('loggin in ...')
  // get the user's login data.
  var login_username = document.getElementById('login_username').value;
  var login_password = document.getElementById('login_password').value;

  var user = {
    "username": login_username,
    "password": login_password,
  }

  // Send post request to web application containing stringified JS object containing user data.
  $.ajax({
      url: '/login',
      type: 'POST',
      data: JSON.stringify(user),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data){

          if(data.success == true){

            hideLoginAndRegister();

            // connect client to server.
            socket = io.connect('http://localhost:4200');

            // tell all the clients that a new user is logged on.
            socket.emit('new_user_logged_on', {username: login_username});
          }
          else {
            window.alert("Uh-Oh, looks like your information is incorrect. Please try Again");
          }
        }
    });
}
//==============================================================================
var register = function(){
    // Get New User Data
    var register_full_name = document.getElementById('register_full_name').value;
    var register_username = document.getElementById('register_username').value;
    var register_email = document.getElementById('register_email').value;
    var register_password = document.getElementById('register_password').value;
    var register_confirm_password = document.getElementById('register_confirm_password').value;

    // Build a JS object with data.
    var new_user = {
      "full_name": register_full_name,
      "username": register_username,
      "email": register_email,
      "password": register_password,
      "confirm_password": register_confirm_password
    }

    // Send post request to web application containing stringified JS object containing user data.
    $.ajax({
        url: '/register',
        type: 'POST',
        data: JSON.stringify(new_user),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){

            if(data.success == true){
              hideLoginAndRegister();
              loadChatData();
              loadMusicPlayer();

              socket = io.connect('http://localhost:4200');

              // tell all the clients that a new user is logged on.
              socket.emit('new_user_logged_on', {username: login_username});
            }
            else {
              window.alert("Uh-Oh, looks like your information is incorrect. Please try Again");
            }
          }
      });

    //TODO, Show the chat.

    //TODO, brodcast on a socket the new online user to the server.
}
//==============================================================================











//==============================================================================
//
//            ********** Helper Functions ***********
//
//==============================================================================
var showUserLoginOnly = function() {
  document.getElementById('chat_div').style.display= 'none';
  document.getElementById('register_div').style.display = 'none';
  document.getElementById('login_div').style.display = 'block';
}
//==============================================================================
var hideLoginAndRegister = function() {
  document.getElementById('chat_div').style.display = 'block';
  document.getElementById('login_div').style.display = 'none';
  document.getElementById('register_div').style.display = 'none';
}
//==============================================================================
var showRegisterOnly = function() {
  document.getElementById('chat_div').style.display= 'none';
  document.getElementById('register_div').style.display = 'block';
  document.getElementById('login_div').style.display = 'none';
}
//==============================================================================
var loadChatData = function(){
    // TODO Are we showing previous messages? Let's not for now just to keep it simple.
}
//==============================================================================
var loadMusicPlayer = function(){
    // TODO display music player/playlist, whatever the music aspect of this application is.
}











//==============================================================================
//
//                ********** Socket Listeners **********
//
//==============================================================================
// TODO Any socket updates that we need to update the UI for should go here.






//============================================================================
// This is our View Model that defines our Knockout bindings.
var vm = {
  user_login: login,
  user_register: register,
  show_user_register: showRegisterOnly,
  show_user_login: showUserLoginOnly
}
//==============================================================================



//==============================================================================
var main = function() {

  console.log('index.js is running...');

  // apply view model bindings. Activate.
  ko.applyBindings(vm);

  //Display pop up window that logs them in or signs them up.
  showUserLoginOnly();

  // TODO load other online users.

  // TODO load previous chat messages? Maybe.

  // TODO load music player/Playlist.


} // end of main.
//==============================================================================
$(document).ready(main);
//==============================================================================
