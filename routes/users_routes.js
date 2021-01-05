const express = require('express');
const router = express.Router();
const {
    removeUser,
    changeUser,
    checkRequiresAdmin,
    getUserInfo
} = require('../controllers/users_controller');
const {
    isAdmin,
    userAuthenticated
} = require('../utils/common_utilities');

router.use(userAuthenticated);

router.get('/:id', userAuthenticated, getUserInfo)

router.put('/:id', userAuthenticated, changeUser);

router.delete('/:id', isAdmin, removeUser);

module.exports = router;
