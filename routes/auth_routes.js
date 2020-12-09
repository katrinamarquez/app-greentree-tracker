const express = require("express"); 
const router = express.Router();
const { registerNew, registerCreate } = require("../controllers/auth_controller");

router.get('/register', registerNew);

router.post('/register', registerCreate);

// router.get('/logout', logout);

module.exports = router; 