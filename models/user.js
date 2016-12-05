//==============================================================================
//
//
//	This file defines our schema for storing users in mongodb.
//
//
//
//==============================================================================
// user.js
//==============================================================================
var mongoose = require('mongoose');
//==============================================================================


var userSchema = new mongoose.Schema({
  full_name : String,
  username : String,
	email: String,
	password: String
});


//==============================================================================
var User = mongoose.model('User', userSchema);
module.exports = User; // handle to DB.
//==============================================================================




// // User Schema
// var UserSchema = mongoose.Schema({
// 	full_name: {
// 		type: String,
// 		index:true
// 	},
// 	password1: {
// 		type: String
// 	},
// 	agent_email: {
// 		type: String
// 	},
//   agent_name: {
// 		type: String
// 	}
// });


// module.exports.createUser = function(newUser, callback){
// 	    newUser.password1 = newUser.password;
// 	    newUser.save(callback);
// 	});
// }
//
// module.exports.getUserByUserId = function(agent_id, callback) {
//   var query = {agent_id: agent_id};
//   User.findOne(query, callback);
// }
//
// module.exports.getUserById = function(id, callback){
// 	User.findById(id, callback);
// }
//
// module.exports.comparePassword = function(candidatePassword, hash, callback){
// 	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
//     	if(err) throw err;
//     	callback(null, isMatch);
// 	});
// }
