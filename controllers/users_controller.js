const User = require('../models/user');
const {
    deleteUser,
    updateUser,
    findUser,
    getAllUsers
} = require('../utils/user_utilities');

const getUsers = function (req, res) {
    getAllUsers(req).exec((err, users) => {
        if (err) {
          res.status(500);
          return res.json({
            error: err.message
          });
        }
        res.send(users)
    }); 
}

const getUserInfo = function (req, res) {
    findUser(req).exec((err, userInfo) => {
        if (err) {
            res.status(500);
            return res.json({
                error: err
            });
        } else {
            res.send(userInfo)
        }
    });
}

const removeUser = function (req, res) {
    deleteUser(req).exec((err) => {
        if (err) {
            res.status(500);
            res.json({
                error: err
            });
        }
        res.sendStatus(204);
    });
}

const changeUser = function (req, res) {
    console.log("In changeUser req: ", req.body)
    
    if (req.error) {
        res.status(req.error.status);
        res.send(req.error.message);
    } else {
        updateUser(req).exec((err, user) => {
            if (err) {
                res.status(500);
                res.json({
                    error: err
                });
            }
            res.status(200);
            res.json(user);
        });
    }
}


// middleware function
async function checkRequiresAdmin(req, res, next) {
    // If block value is passed in body, make sure it can be updated
    if (req.body.blocked) {
        await User.findById(req.params.id).exec((err, user) => {
            if (err) {
                req.error = {
                    message: err.message,
                    status: 500
                };
                next();
            }
            // if user.blocked isn't set, we only care if we have admin user if blocked is being set to true
            // if user.blocked is set, we want to make sure user is admin if it is being changed
            if ((user.blocked && user.blocked.toString() != req.body.blocked) ||
                !user.blocked && req.body.blocked == "true") {
                if (req.user.role !== 'admin') {
                    // Trying to block/unblock user and not admin
                    req.error = {
                        message: 'Only admin can block/unblock a user',
                        status: 403
                    };
                }
            }
            next();
        });
    }
}

module.exports = {
    removeUser,
    changeUser,
    checkRequiresAdmin,
    getUserInfo,
    getUsers
};