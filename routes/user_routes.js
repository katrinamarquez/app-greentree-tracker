const express = require("express")
const router = express.Router()
const { registerNew, registerCreate, loginNew, loginCreate, logout } = require("../controllers/auth_controller")
const authRedirect = require("../middleware/auth_middleware")

router.get("/register", authRedirect, registerNew);

router.post("/register", registerCreate);

router.get("/login", loginNew);

router.post("/login", loginCreate);

router.get("/logout", logout);

module.exports = router