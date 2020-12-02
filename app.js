const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const plantRouter = require("./routes/plant_routes.js")
const mongoose = require("mongoose")

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// when we need to deploy:
if(process.env.NODE_ENV !== "production"){
  require("dotenv").config();
}

const dbConn = process.env.MONGODB_URI || "mongodb://localhost/app-greentree-tracker"

mongoose.connect(
  dbConn,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  err => {
    if (err) {
      console.log("Error connecting to database", err)
    } else {
      console.log("Connected to database!")
    }
  }
)

app.use("/plants", plantRouter)

app.listen(port, () => {
  console.log(`Greentree Tracker app listening on port ${port}`)
})