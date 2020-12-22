const User = require('../models/user');

const deleteUser = function (req) {
    return User.findByIdAndRemove(req.params.id);
}

const updateUser = function (req) {
    return User.findByIdAndUpdate(req.params.id, req.body);
}

const findUser = function (req) {
    return User.findById(req.params.id)
}

module.exports = {
    deleteUser,
    updateUser,
    findUser
};