const express = require("express")
const expressSession = require('express-session')
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const exphbs  = require('express-handlebars'); 

const plantRouter = require("./routes/plant_routes.js")
const authRouter = require("./routes/auth_routes");

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(expressSession({
  secret: 'treesarefriends',
  resave: false, 
  saveUninitialized: true,
  cookie: { expires: 600000 }
}))

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

app.use("/users", userRouter)

console.log("port: ",process.env.PORT)
console.log(process.env)

app.listen(port, () => {
  console.log(`Greentree Tracker app listening on port ${port}`)
})