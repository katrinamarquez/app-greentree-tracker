const { getAllQuotes, getQuoteById, addQuote, deleteQuote, updateQuote } = require("../utils/quote_utilities")

// Execute query from getAllquotes
const getQuotes = function (req, res) {
  getAllQuotes(req).exec((err, quotes) => {
    if (err) {
      res.status(500);
      return res.json({
        error: err.message
      });
    }
    res.send(quotes)
  }); 
};

// Execute query from getQuoteById
const getQuote = function (req, res) {
  getQuoteById(req).exec((err, quote) => {
    if (err) {
      res.status(400);
      return res.send("Quote not found");
    }
    res.send(quote);
  });
};

// Save quote from addquote
const makeQuote = function (req, res) {
    // Add date
    const date = new Date()
    req.body.modified_date = date

    req.body.user_id = req.user._id

    console.log(req.body)
  
    addQuote(req).save((err, quote) => {
        if (err) {
            res.status(500);
            return res.json({
                error: err.message
            });
        }
        res.status(201);
        res.send(quote);
    });
};

// Execute query from deletequote
const removeQuote = function (req, res) {
  deleteQuote(req.params.id).exec((err) => {
    if (err) {
        res.status(500);
        return res.json({
            error: err.message
        });
    }
    res.sendStatus(204);

});
};

const changeQuoteStatus = function (req, res) {

  console.log("In quotestatus: ", req.body)
  console.log("In quotestatus id: ", req.params.id)

  updateQuote(req).exec((err, data) => {
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
  getQuotes,
  getQuote,
  makeQuote,
  removeQuote,
  changeQuoteStatus
}
