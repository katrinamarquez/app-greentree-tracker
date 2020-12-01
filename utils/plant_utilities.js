const Plant = require("../models/plant.js")

// Return list of all plants 
const getAllPlants = function (req) {
  return Plant.find()
}

const getPlantById = function (req) {
  return Plant.findById(req.params.id)
}

module.exports = {
  getAllPlants,
  getPlantById
}