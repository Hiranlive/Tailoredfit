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
        unique : true,
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
    profile_image : {
        type : String
    },
    salt: String,
    hash: String
});

// Get Single User
module.exports.getUserById = function(id, callback) {
    User.findById(id, callback)
}

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

module.exports.updateUser = function(id, user, options, callback) {
    var query = {_id : id};
    
    var updatedUser = {};
    
    if(user.name != undefined && user.name != "") {
        updatedUser['name'] = user.name;
    }

    if(user.phone != undefined && user.phone != "") {
        updatedUser['phone'] = user.phone;
    }

    if(user.profile_image != undefined && user.profile_image != "") {
        updatedUser['profile_image'] = user.profile_image;
    }

    if(user.password != undefined && user.password != "") {
        var salt = bcrypt.genSaltSync(10);

        var hash = bcrypt.hashSync(user.password, salt);

        updatedUser['password'] = hash;
    }
    
    User.findOneAndUpdate(query, updatedUser, options, callback);
}

module.exports.logoutUser = function(id, options, callback) {

    var query = {_id : id};
    
    var updatedUser = {};


    if(user.name != undefined) {
        updatedUser['name'] = user.name;
    }

    if(user.phone != undefined) {
        updatedUser['phone'] = user.phone;
    }

    if(user.password != undefined) {

        var salt = bcrypt.genSaltSync(10);

        var hash = bcrypt.hashSync(user.password, salt);

        updatedUser['password'] = hash;
    }
    
    User.findOneAndUpdate(query, updatedUser, options, callback);
}