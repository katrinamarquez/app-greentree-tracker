const express = require("express");
const exphbs  = require('express-handlebars');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const plantRouter = require("./routes/plant_routes.js")
const userRouter = require("./routes/user_routes.js")

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(expressSession({
  secret: 'treesarefriends',
  resave: false, 
  saveUninitialized: true,
  cookie: { expires: 600000 },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
})) 

app.use(bodyParser.json());

require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

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

app.use("/user", userRouter)

app.use(require("./middleware/error_handler_middleware"));

console.log("port: ",process.env.PORT)
console.log(process.env)

app.listen(port, () => {
  console.log(`Greentree Tracker app listening on port ${port}`)
})