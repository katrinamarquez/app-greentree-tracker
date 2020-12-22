const Quote = require("../models/quote.js")

// Return list of all quotes 
const getAllQuotes = function (req) {
  return Quote.find()
}

const getQuoteById = function (req) {
  return Quote.findById(req.params.id)
}

const addQuote = function(req){
  return new Quote(req.body)
}   

const deleteQuote = function (id) {
  return Quote.findByIdAndRemove(id)
}

const updateQuote = function (req) {
  return Quote.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
};

module.exports = {
  getAllQuotes,
  getQuoteById,
  addQuote, 
  deleteQuote,
  updateQuote
}