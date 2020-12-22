const passport = require('passport');
const User = require('../models/user');

const adminPage = function (req, res) {
    res.sendStatus(200)
}

module.exports = {
    adminPage
}