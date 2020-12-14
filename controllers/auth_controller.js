const passport = require('passport');
const User = require('../models/user');

const register = function (req, res) {
    User.register(new User({
        business_name: req.body.business_name,
        email: req.body.email,
        role: req.body.role
    }), req.body.password, function (err) {
        if (err) {
            if(err.name === 'UserExistsError') {
                res.status(409)
                res.json({
                    error: err.message
                });
            } else {
                res.status(500);
                res.json({
                    error: err
                });
            }
        } else {
            // Log in the newly registered user
            loginUser(req, res);
        }
    });
};

const logout = function (req, res) {
    req.logout();
    console.log('logged out user');
    console.log('session object:', req.session);
    console.log('req.user:', req.user);
    res.sendStatus(200);
}

// helper functions
const authenticate = passport.authenticate('local');

function loginUser(req, res) {
    // passport.authenticate returns a function that we will call with req, res, and a callback function to execute on success    

    authenticate(req, res, function () {
        console.log('authenticated', req.user.business_name);
        console.log('session object:', req.session);
        console.log('req.user:', req.user);
        console.log('session ID:', req.sessionID);
        res.status(200);
        res.json({user: req.user, sessionID: req.sessionID});
    });
}

function activeUserSession(req,res) {
    console.log("in activeUserSession sessionID", req.sessionID)
    console.log("in activeUserSession user", req.user)
    if(req.sessionID && req.user) {
        res.status(200);
        res.send(req.sessionID)
    }
    else {
        res.sendStatus(403);
    }    
}
// EDITED

module.exports = {
    register,
    login: loginUser,
    logout,
    activeUserSession
};