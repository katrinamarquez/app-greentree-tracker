const express = require("express")
const router = express.Router()
const { getCart, getCartItem, addToCart, removeCartItem, changeCartItem } = require("../controllers/cart_controller")
const { isAdmin, userAuthenticated } = require("../utils/common_utilities")

// READ
// GET on '/cart'
// Returns all cart items
router.get("/", userAuthenticated, getCart)

// READ
// GET on '/cart/:id'
router.get("/:id", getCartItem)

router.post("/:id/add-to-cart", userAuthenticated, addToCart)

// DELETE
router.delete("/:id", userAuthenticated, removeCartItem)

// UPDATE
router.put("/:id", userAuthenticated, changeCartItem)

module.exports = router