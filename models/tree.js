const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Required fields for tree
const Plant = new Schema ({
  botanical_name: {
    type: String,
    required: true
  },
  common_name: {
    type: String
  },
  description: {
    type: String
  }, 
  price: {
    type: Number,
    required: true
  },
  pot_size: {
    type: String,
    enum: ['140mm','250mm','350mm'],
    required: true
  }, 
  special: {
    type: Boolean, 
  }, 
  category: {
    type: String,
    enum: ['shrub', 'tree','ground cover','grass'],
    required: true
  }
})

module.exports = mongoose.model("Plant", Plant)