const { getAllPlants, getPlantById, addPlant, deletePlant, updatePlant } = require("../utils/plant_utilities")

// Execute query from getAllPlants
const getPlants = function (req, res) {
  getAllPlants(req).exec((err, plants) => {
    if (err) {
      res.status(500);
      return res.json({
        error: err.message
      });
    }
    res.send(plants)
  }); 
};

// Execute query from getPlantById
const getPlant = function (req, res) {
  getPlantById(req).exec((err, plant) => {
    if (err) {
      res.status(400);
      return res.send("Plant not found");
    }
    res.send(plant);
  });
};

// Save Plant from addPlant
const makePlant = function (req, res) {
  addPlant(req).save((err, plant) => {
      if (err) {
          res.status(500);
          return res.json({
              error: err.message
          });
      }
      res.status(201);
      res.send(plant);
  });
};

// Execute query from deletePlant
const removePlant = function (req, res) {
  deletePlant(req.params.id).exec((err) => {
    if (err) {
        res.status(500);
        return res.json({
            error: err.message
        });
    }
    res.sendStatus(204);

});
};

const changePlant = function (req, res) {
  updatePlant(req).exec((err, data) => {
      if (err) {
          res.status(500);
          return res.json({
              error: err.message
          });
      }
      res.send(data);
  });
};

module.exports = {
  getPlants,
  getPlant,
  makePlant,
  removePlant,
  changePlant
}