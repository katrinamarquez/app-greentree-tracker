const Plant = require("../models/plant.js")

// Return list of all plants 
const getAllPlants = function (req) {
  return Plant.find()
}

// Return list of all filtered plants 
const getAllFilteredPlants = function (req) {
  return Plant.find(req.query)
}

const getPlantById = function (req) {
  return Plant.findById(req.params.id)
}

const addPlant = function(req){
  let date = Date.now();
  // Set date for this new post
  req.body.modified_date = date;

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
  getAllFilteredPlants,
  getPlantById,
  addPlant, 
  deletePlant,
  updatePlant
}