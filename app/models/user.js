var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

// User Schema
var userSchema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    type : {
        type : String,
        default : "Normal",
        require : true
    },
    password : {
        type : String,
        require : true
    },
    phone : {
        type : String
    },
    salt: String,
    hash: String
});

// Get Single User
module.exports.getUserById = function(id, callback) {
    User.findById(id, callback)
}

// // Update User
// module.exports.updateUser = function(id, User, options, callback) {
//     var query = {_id : id};
    
//     var update = {
//         name : User.name,
//         email : User.email,
//         type : User.type,
//         password : User.password,
//         phone : User.phone
//     };

//     User.findOneAndUpdate(query, update, options, callback);
// }

// // Remove User
// module.exports.removeUser = function(id, callback) {
//     var query = {_id : id};

//     User.remove(query, callback);
// }

userSchema.pre('save', function (next) {
    var user = this;

    user.constructor.findOne({name: user.name}, function (err, user1) {
        if (err) throw err;
        if (!user1) {
            if (user.isModified('password') || user.isNew) {
                bcrypt.genSalt(10, function (err, salt) {
                    if (err) {
                        return next(err);
                    }
                    bcrypt.hash(user.password, salt, function (err, hash) {
                        if (err) {
                            return next(err);
                        }
                        user.password = hash;
                        next();
                    });
                });
            } else {
                return next();
            }
        }
        else{
            console.log("User already exists!");
            return next(err);
        }
    });
});

userSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

userSchema.methods.getUsers = function (callback, limit) {
    User.find(callback).limit(limit);
};

var User = module.exports = mongoose.model('User', userSchema);

// Get Users
module.exports.getUsers = function(callback, limit) {
    User.find(callback).limit(limit);
}

// Remove Trainer
module.exports.removeUser = function(id, callback) {
    var query = {_id : id};

    User.remove(query, callback);
}