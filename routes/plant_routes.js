const express = require("express")
const router = express.Router()
const { getPlants, getFilteredPlants, getPlant, makePlant, removePlant, changePlant } = require("../controllers/plants_controller")
const { isAdmin, userAuthenticated, checkPrice } = require("../utils/common_utilities")

// READ
// GET on '/plants'
// Returns all plants
router.get("/", getPlants)

// READ
// GET on '/plants'
// Returns all plants
router.get("/filtered", checkPrice, getFilteredPlants)

// READ
// GET on '/plants/:id'
// Returns plant with given id
router.get("/:id", getPlant)

router.use(userAuthenticated)

// CREATE
// POST on '/plants'
// Creates a new plant
router.post("/new", isAdmin, makePlant)

// DELETE
// DELETE on '/plants/:id'
// Deletes a plant with id
router.delete("/:id", isAdmin, removePlant)

// UPDATE
// PUT on 'plants/:id'
// Updates a plant with id
router.put("/:id", isAdmin, changePlant)

module.exports = router