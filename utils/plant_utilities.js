const Plant = require("../models/plant.js")

// Return list of all plants 
const getAllPlants = function (req) {
  return Plant.find()
}

const getPlantById = function (req) {
  return Plant.findById(req.params.id)
}

const addPlant = function(req){
  return new Plant(req.body)
}   

const deletePlant = function (req) {
  return Plant.findByIdAndRemove(id)
}

module.exports = {
  getAllPlants,
  getPlantById,
  addPlant, 
  deletePlant
}