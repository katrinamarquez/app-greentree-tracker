const { getAllPlants, getPlantById } = require("../utils/plant_utilities")

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
const getPlant = 

module.exports = {
  getPlants
}