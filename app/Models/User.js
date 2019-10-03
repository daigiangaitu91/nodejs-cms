const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    firstName: {
        type: String,
        required: true
    },
    
    lastName: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true
    },
    
    password: {
        type: String,
        required: true
    }


});

//authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

module.exports = {User: mongoose.model('user', UserSchema )};