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

const deletePlant = function (id) {
  return Plant.findByIdAndRemove(id)
}

const updatePlant = function (req) {
  return Plant.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
};

module.exports = {
  getAllPlants,
  getPlantById,
  addPlant, 
  deletePlant,
  updatePlant
}