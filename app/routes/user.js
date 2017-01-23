var express = require('express');
var passport = require('passport');
var config = require('../config/database');
var router = express.Router();
var jwt = require('jwt-simple');

require('../config/passport')(passport);

User = require('../models/user');
Bookmark = require('../models/bookmark');

// create a new user account (POST http://localhost:8080/api/signup)
router.post('/api/signup', function(req, res) {
    if (!req.body.email || !req.body.password) {
        res.json({
            success: false,
            msg: 'Please pass email and password.'
        });
        console.log(res);
    } else {
        var newUser = new User({
            name: req.body.name,
            email: req.body.email,
            type: "Normal",
            phone: req.body.phone,
            password: req.body.password
        });

        // Save the user
        console.log('create new user: ' + newUser);

        newUser.save(function(err) {
            // console.log(err);
            // console.log("<<<<<<<<<<<<<>>>>>>>>>>>>>>>>");
            if (err) {
                res.json({
                    success: false,
                    msg: 'Username already exists.'
                });
            }
            else{
                res.json({
                    success: true,
                    msg: 'Successful created new user.'
                });
            }
        });
    }
});

// route to admin authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/api/authenticate_admin', function(req, res) {
    User.findOne({
        email : req.body.email,
        type : "Admin"
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            return res.status(403).send({
                success: false,
                msg: 'Authentication failed!'
            });
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.encode(user, config.secret);
                    // return the information including token as JSON
                    res.json({
                        success: true,
                        token: 'JWT ' + token
                    });
                } else {
                    return res.status(403).send({
                        success: false,
                        msg: 'Authentication failed. Wrong password.'
                    });
                }
            });
        }
    });
});

router.get('/api/is_logged', passport.authenticate('jwt', {
    session: false
}), function(req, res) {
    var token = getToken(req.headers);
    console.log('the token: ' + token);

    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            name: decoded.name,
            type : "Admin"
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({
                    success: false,
                    msg: 'Authentication failed. User not found.'
                });
            } else {
                res.json({
                    success: true,
                    msg: user
                });
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            msg: 'No token provided.'
        });
    }
});

router.get('/api/users', passport.authenticate('jwt', {
    session: false
}), function(req, res) {
    var token = getToken(req.headers);
    console.log('the token: ' + token);

    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            name : decoded.name,
            type : "Admin"
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({
                    success: false,
                    msg: 'Admin Authentication Required.'
                });
            } else {
                User.getUsers(function(err, users) {
                    if(err){
                        throw err;
                    }
                    else{
                        res.json(users);
                    }
                }, 1000)
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            msg: 'No token provided.'
        });
    }
});

router.delete('/api/users/:_id', passport.authenticate('jwt', {
    session: false
}), function(req, res) {
    var token = getToken(req.headers);
    console.log('the token: ' + token);

    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            name : decoded.name,
            type : "Admin"
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({
                    success: false,
                    msg: 'Admin Authentication Required.'
                });
            } else {
                var id = req.params._id;
                var user = req.body;

                User.removeUser(id, function(err, user) {
                    if(err){
                        throw err;
                    }
                    else{
                        res.json(user);
                    }
                })
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            msg: 'No token provided.'
        });
    }
});

//Normal users
// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/api/authenticate', function(req, res) {
    User.findOne({
        email : req.body.email,
        type : "Normal"
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            return res.status(403).send({
                success: false,
                msg: 'Authentication failed!'
            });
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.encode(user, config.secret);
                    // return the information including token as JSON
                    res.json({
                        success: true,
                        token: 'JWT ' + token
                    });
                } else {
                    return res.status(403).send({
                        success: false,
                        msg: 'Authentication failed. Wrong password.'
                    });
                }
            });
        }
    });
});

router.get('/api/is_logged_user', passport.authenticate('jwt', {
    session: false
}), function(req, res) {
    var token = getToken(req.headers);
    console.log('the token: ' + token);

    if (token) {
        var decoded = jwt.decode(token, config.secret);

        User.findOne({
            email : decoded.email,
            type : "Normal",
            id : decoded.id
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({
                    success: false,
                    msg: 'Authentication failed. User not found.'
                });
            } else {
                res.json({
                    success: true,
                    msg: user
                });
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            msg: 'No token provided.'
        });
    }
});

router.get('/api/user_details', passport.authenticate('jwt', {
    session: false
}), function(req, res) {
    var token = getToken(req.headers);

    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            email : decoded.email,
            type : "Normal",
            id : decoded.id
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({
                    success: false,
                    msg: 'Authentication failed. User not found.'
                });
            } else {
                res.json(user);
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            msg: 'No token provided.'
        });
    }
});

router.put('/api/update_user_settings', passport.authenticate('jwt', {
    session: false
}), function(req, res) {
    var token = getToken(req.headers);
    var updateUser = req.body;

    if (token) {
        var decoded = jwt.decode(token, config.secret);

        User.findOne({
            type : "Normal",
            email : decoded.email,
            id : decoded.id
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({
                    success: false,
                    msg: 'Authentication failed. User not found.'
                });
            } else {
                User.updateUser(decoded._id, updateUser, {}, function(err, user_res) {
                    if(err){
                        res.json({
                            success: false,
                            msg: 'Invalid request.'
                        });
                    }
                    else{
                        res.json({
                            success: true,
                            msg: 'User profile updated successfully.'
                        });
                    }
                });
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            msg: 'No token provided.'
        });
    }
});

router.get('/api/bookmarks', passport.authenticate('jwt', {
    session: false
}), function(req, res) {
    var token = getToken(req.headers);
    console.log('the token: ' + token);

    if (token) {
    	var decoded = jwt.decode(token, config.secret);

        User.findOne({
            email : decoded.email,
            type : "Normal",
            id : decoded.id
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({
                    success: false,
                    msg: 'Authentication failed. User not found.'
                });
            } else {
                Bookmark.find({
		            'user_id': decoded._id,
		        }, function(err, bookmarks) {
		            if (err) throw err;

		            if (!bookmarks) {
		                return res.status(403).send({
		                    success: false,
		                    msg: 'Bookmarks Empty!'
		                });
		            } else {
		                res.json(bookmarks);
		            }
		        });
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            msg: 'No token provided.'
        });
    }
});

router.post('/api/bookmarks', passport.authenticate('jwt', {
    session: false
}), function(req, res) {
    var token = getToken(req.headers);

    if (token) {
    	var decoded = jwt.decode(token, config.secret);

        User.findOne({
            email : decoded.email,
            type : "Normal",
            id : decoded.id
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({
                    success: false,
                    msg: 'Authentication failed. User not found.'
                });
            } else {
                var newBookmark = new Bookmark({
		            user_id: decoded._id,
		            item_id: req.body.item_id,
		            type: req.body.type,
		            preview: req.body.preview
		        });

		        newBookmark.save(function(err) {
		            if (err) {
		                res.json({
		                    success: false,
		                    msg: 'Error adding bookmark.'
		                });
		            }
		            else{
		                res.json({
		                    success: true,
		                    msg: 'Successfully added bookmark.'
		                });
		            }
		        });
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            msg: 'No token provided.'
        });
    }
});

router.delete('/api/bookmarks/:_id', passport.authenticate('jwt', {
    session: false
}), function(req, res) {
    var token = getToken(req.headers);
    console.log('the token: ' + token);

    if (token) {
        var decoded = jwt.decode(token, config.secret);

        User.findOne({
            email : decoded.email,
            type : "Normal",
            id : decoded.id
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({
                    success: false,
                    msg: 'Authentication failed. User not found.'
                });
            } else {
                Bookmark.findOne({
		            '_id' : req.params._id,
		            'user_id' : decoded._id
		        }, function(err, bookmark) {
		            if (err) throw err;

		            if (!bookmark) {
		                return res.status(403).send({
		                    success: false,
		                    msg: 'Bookmark not found.'
		                });
		            } else {
		                var id = req.params._id;

		                Bookmark.remove({_id : id}, function(err, bookmark) {
		                    if(err){
		                        throw err;
		                    }
		                    else{
		                        res.json({
				                    success: true,
				                    msg: 'Bookmark is removed successfully.'
				                });
		                    }
		                })
		            }
		        });
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            msg: 'No token provided.'
        });
    }
});

getToken = function(headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = router;