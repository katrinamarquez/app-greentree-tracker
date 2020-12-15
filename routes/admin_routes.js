const express = require('express');
const router = express.Router();
const { adminPage } = require('../controllers/admin_controller')
const {
    isAdmin,
    userAuthenticated
} = require('../utils/common_utilities');

router.use(userAuthenticated);

router.get('/', isAdmin, (req, res) => {
    res.sendStatus(200)
});

module.exports = router;