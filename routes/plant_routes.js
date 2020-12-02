const express = require("express")
const router = express.Router()
const { getPlants, getPlant, makePlant, removePlant } = require("../controllers/plants_controller")

// READ
// GET on '/plants'
// Returns all plants
router.get("/", getPlants)

// READ
// GET on '/plants/:id'
// Returns plant with given id
router.get("/:id", getPlant)

// CREATE
// POST on '/plants'
// Creates a new plant
router.post("/new", makePlant)

// DELETE
// DELETE on '/plants/:id'
// Deletes a plant with id
router.delete("/:id", removePlant)

// UPDATE
// PUT on 'plants/:id'
// Updates a plant with id

module.exports = router