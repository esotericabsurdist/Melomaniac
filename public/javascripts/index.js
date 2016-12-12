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

// as soon as the client loads the page, establish a sockts connection.
window.SOCKET = io.connect('http://localhost:4200');

// cache for search results.
window.search_cache = new Array();

//==============================================================================
//
//********** Knockout Referenced Functions *********** Note, some helper functions are also referenced.
//
//==============================================================================
var logout = function(){
  console.log('logging out...');

}

//==============================================================================
var login = function(){
  console.log('logging out ...')
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
      success: function(user){

          if(user.success == true){

            vm.current_username(user.username);

            hideLoginAndRegister();

            // connect client to server.
            socket = io.connect('http://localhost:4200');

            // tell all the clients that a new user is logged on.
            socket.emit('new_user', {username: login_username});
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

    if(register_password == register_confirm_password){
      // Build a JS object with data.
      var new_user = {
        "full_name": register_full_name,
        "username": register_username,
        "email": register_email,
        "password": register_password
      }

      // Send post request to web application containing stringified JS object containing user data.
      $.ajax({
          url: '/register',
          type: 'POST',
          data: JSON.stringify(new_user),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function(user){

              if(user.success == true){
                vm.current_username(user.username);
                hideLoginAndRegister();
                loadChatData();

                // tell all the clients that a new user is logged on.
                window.SOCKET.emit('new_user_logged_on', {username: user.username});
              }
              else {
                window.alert("Uh-Oh, looks like your information is incorrect. Please try Again");
              }
            }
        });
    }
    else{
      window.alert("Passwords must match.")
    }
}
//==============================================================================











//==============================================================================
//
//   ********** Helper Functions, some are knock out referenced. ***********
//
//==============================================================================
var showUserLoginOnly = function() {
  document.getElementById('chat_and_music_div').style.display= 'none';
  document.getElementById('register_div').style.display = 'none';
  document.getElementById('login_div').style.display = 'block';
}
//==============================================================================
var hideLoginAndRegister = function() {
  document.getElementById('chat_and_music_div').style.display = 'block';
  document.getElementById('login_div').style.display = 'none';
  document.getElementById('register_div').style.display = 'none';
  // document.getElementById('current_username').innerHTML = window.USNAME + '\'s chat:';
}
//==============================================================================
var showRegisterOnly = function() {
  document.getElementById('chat_and_music_div').style.display= 'none';
  document.getElementById('register_div').style.display = 'block';
  document.getElementById('login_div').style.display = 'none';
}
//==============================================================================
var loadChatData = function(){
  // show other online users or load chat history here. We might not do this.
  //TODO
}
//==============================================================================
var displayTrackResult = function(track){
  /*
      This function recieves a track object and builds a list item with its data.
      The list item is then appended to the <ul> search query track list.
  */
  var track_list = document.getElementById('track_list');
  // create a new list item for the track.
  var track_item = document.createElement('li');

  //div containing track details ==========
  var track_details_div = document.createElement('div');
  track_details_div.className = 'col-xs-6'; // make div side by side.
  // set track name
  var track_name = document.createElement('p');
  track_name.innerHTML = 'Track: ' + track.name;
  track_details_div.appendChild(track_name);
  // set the artist(s)
  var artist_name = document.createElement('p');
  artist_name.innerHTML = 'Artist: ';
  // There Can be several artists for a track, so check the entire array.
  var artist_count = track.artists.length;
  for(var i = 0; i < artist_count; i++){
      artist_name.innerHTML += track.artists[i].name + ' ';
  }
  track_details_div.appendChild(artist_name);
  // set the album
  var album_name = document.createElement('p');
  album_name.innerHTML = 'Album: ' + track.album.name
  track_details_div.appendChild(album_name);
  // append details to list item.
  track_item.appendChild(track_details_div);
  //div containing album img ==============
  var track_img_div = document.createElement('div');
  track_img_div.className = 'col-xs-6'; // make div side by side.
  var track_img = document.createElement('img');
  track_img.height = 100;
  track_img.width = 100;
  // Just use the first image. Perhaps load a default if this does't exist later.
  track_img.src = track.album.images[0].url;
  track_img_div.appendChild(track_img);
  track_item.appendChild(track_img_div);
  //=======================================
  var add_button = document.createElement('button');
  add_button.value = "Add";
  add_button.setAttribute('class', 'btn btn-primary form-control')
  track_img_div.appendChild(add_button);

  //=======================================
  // create a audio tag to the list item.
  var track_player = document.createElement('audio');
  // make the controls of the player visible.
  track_player.setAttribute('controls','controls');
  // create a source tag.
  var track_player_source = document.createElement('source');
  // set the properties of the video/audio tag.
  track_player_source.src = track.preview_url;
  track_player_source.type = 'audio/mpeg';
  // append the souce tag to the audio/video tag
  track_player.appendChild(track_player_source);
  // append track data to list item.
  track_item.appendChild(track_player);
  // append the item to the list.
  track_list.appendChild(track_item);
}
//==============================================================================
var sendChat = function(){
  // get users message
  var user_message = document.getElementById('message').value;
  console.log(user_message);
  // clear message
  document.getElementById('message').value = '';
  // tell the server there is a new chat.
  window.SOCKET.emit('new_chat', {username: vm.current_username(), message: user_message});
}
//==============================================================================
var submitTrackQuery = function() {
  // clear the old search results.
  document.getElementById('track_list').innerHTML = '';

  // clear the old search cache.
  window.search_cache = new Array(); // memory leak. should delete all elements instead.

  // get new search results.
  var query = document.getElementById('track_query').value;
  $.ajax({
      url: 'https://api.spotify.com/v1/search',
      data: {
        q: query,
        type: 'track',
      },
      success: function (response) {
        // get array of tracks
        var tracks = response.tracks.items;
        //console.log(response);
        // get number of tracks
        var track_count = tracks.length;
        // for each track, display it:
        for(var i = 0; i < track_count; i++){
          // display track in the search result list.
          displayTrackResult(tracks[i]);
          // cache the track in case the user wants to add it to the playlist.
          window.search_cache.push(tracks[i]);
          }
        }
    });
}
//==============================================================================
var addToPlaylist = function(track_index){
  // add to playlist if not already in playlist.
  var track = search_cache[track_index];
  // send emit message with track data on socket to app that there is a new playlist update.
  window.SOCKET.emit('new_track', track);
}
//==============================================================================
var loadPlaylist = function(){
  window.SOCKET.emit('no_playlist');
}
//==============================================================================










//==============================================================================
//
//                ********** Socket Listeners **********
//
//==============================================================================
window.SOCKET.on('new_chat_announcement', function(chat){
  console.log(chat);
  // get chat handle.
  var chat_area = document.getElementById('chat');
  // update the chat box
  vm.users_chat(chat_area.value + chat.username + ': ' + chat.message + '\n');
  // scroll to bottom
  chat_area.scrollTop = chat.scrollHeight;
});
//==============================================================================
window.SOCKET.on('new_playlist_announcement', function(playlist){
  // empty the list old playlist. This is necessary because observableArrays
  // only update the view when objects are added or removed, not modified.
  vm.playlist.removeAll();

  // adding objects 1 at a time so knockout will update. This is annoying!
  for( var i = 0; i < playlist.length; i++){
    vm.playlist.push(playlist[i]);
  }
});
//==============================================================================







//============================================================================
// This is our View Model that defines our Knockout bindings.
var vm = {
  user_login: login,
  user_logout: logout,
  user_register: register,
  show_user_register: showRegisterOnly,
  show_user_login: showUserLoginOnly,
  submit_track_query: submitTrackQuery,
  submit_chat: sendChat,
  current_username: ko.observable(),
  users_chat: ko.observable(),
  playlist: ko.observableArray()
};
//==============================================================================








//==============================================================================
var main = function() {

  console.log('index.js is running...');

  // apply view model bindings. Activate.
  ko.applyBindings(vm);

  //Display pop up window that logs them in or signs them up.
  showUserLoginOnly();

  // capture search results' click events.
  $(document.getElementById("track_list")).on('click', 'button', function(data) {
    // get the index of the search result.
    //     this  ->  parent ->  parent  -> index
    // <button>  ->  <div>  ->  <li>    -> index
    var track_index = $(this).parent().parent().index();
    // add the selected track to the playlist.
    addToPlaylist(track_index);
  });

  // load previous chat messages? Nah
  vm.user_chat = '\n';// make it blank.

  // load music player/Playlist.
  loadPlaylist();

  $(document.getElementById("playlist")).on('click', 'button', function(data) {
    // get the index of the search result.
    //     this  ->  parent ->  parent  -> index
    // <button>  ->  <div>  ->  <li>    -> index
    var track_index = $(this).parent().parent().index();

    // get track data
    var track = vm.playlist[track_index];

    // play the selected file.
    var music_player = document.getElementById("playlist_player")

    // set the audio source
    music_player.src = track.preview_url;

    // set to play.
    music_player.setAttribute)("autoplay", "true");

    console.log(vm.playlist[track_index]);
  });

} // end of main.
//==============================================================================
$(document).ready(main);
//==============================================================================
