const express = require("express")
const router = express.Router()
// change to quote controllers
const { getQuotes, getQuote, makeQuote, removeQuote, changeQuote } = require("../controllers/quotes_controller")
// change to authenticate user?
const { isAdmin, userAuthenticated } = require("../utils/common_utilities")

// READ
// GET on '/quotes'
// Returns all quotes
router.get("/", isAdmin, getQuotes)

// READ
// GET on '/quotes/:id'
// Returns plant with given id
router.get("/:id", isAdmin, getQuote)

// CREATE
// POST on '/quotes'
// Creates a new plant
router.post("/new", userAuthenticated, makeQuote)

// DELETE
// DELETE on '/quotes/:id'
// Deletes a plant with id
router.delete("/:id", removeQuote)

// UPDATE
// PUT on 'quotes/:id'
// Updates a plant with id
router.put("/:id", changeQuote)

module.exports = router