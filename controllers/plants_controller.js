const { getAllPlants, getAllFilteredPlants, getPlantById, addPlant, deletePlant, updatePlant } = require("../utils/plant_utilities")

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

// Execute query from getAllPlants
const getFilteredPlants = function (req, res) {
  
  console.log("In filtered plants body: ", req.query)
  
  getAllFilteredPlants(req).exec((err, plants) => {
    if (err) {
      res.status(500);
      return res.json({
        error: err.message
      });
    }
    res.send(plants)
  }); 
};


const getPosts = function (req, res) {
  // execute the query from getAllPosts
  getAllPosts(req).
  sort({
      modified_date: -1
  }).
  exec((err, posts) => {
      if (err) {
          res.status(500);
          return res.json({
              error: err.message
          });
      }
      res.send(posts);
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
  // Add date
	const date = new Date()
  req.body.modified_date = date
  console.log(req.body)
  
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
  console.log('*** changPlant req.user is', req.user);
  console.log('req.body: ', req.body);
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
  getFilteredPlants,
  getPlant,
  makePlant,
  removePlant,
  changePlant
}
