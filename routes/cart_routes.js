const express = require("express")
const router = express.Router()
const { getCart, getCartItem, addToCart, removeCartItem, changeCartItem } = require("../controllers/cart_controller")
const { isAdmin, userAuthenticated } = require("../utils/common_utilities")

// READ
// GET on '/plants'
// Returns all plants
router.get("/", userAuthenticated, getCart)

// READ
// GET on '/plants/:id'
// Returns plant with given id
router.get("/:id", getCartItem)

router.post("/:id/add-to-cart", userAuthenticated, addToCart)

// DELETE
// DELETE on '/plants/:id'
// Deletes a plant with id
router.delete("/:id", removeCartItem)

// UPDATE
// PUT on 'plants/:id'
// Updates a plant with id
router.put("/:id", changeCartItem)

module.exports = router