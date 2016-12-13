# Music Lounge

####Description:
This is a single page Javascript web application that allows users search for
and listen to music samples. Users can select songs to be added to a playlist
shared among all other users. Users may select songs from the playlist to play.  
There is also an instant messaging chat box that is shared among all users. The
music content is served from Spotify's public API.

####Requirements:
- node.js
- mongodb

####To Run:
```shell
mkdir your_path_here/data
mkdir your_path_here/data/db
mongod --dbpath your_path_here/data &
cd project_root
npm install
npm start
```

####Bugs and Notes:
- The application will crash if a user attempts to sign in or register in while
 mongodb is not started.
- Users cannot yet remove tracks from the playlist.
- There is no limit on the number of tracks in the playlist.
- If there are multiple artists for a track, only the first artist will be
displayed in the playlist listing.
- index.html features a mixture of bootstrap and other formatting techniques.
