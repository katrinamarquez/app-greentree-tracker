const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require("connect-mongo")(session)
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const plantRouter = require("./routes/plant_routes.js")
const authRouter = require("./routes/auth_routes.js")
const usersRouter = require("./routes/users_routes.js")
const adminRouter = require("./routes/admin_routes.js")
const quoteRouter = require("./routes/quote_routes.js")
const cartRouter = require("./routes/cart_routes.js")

const port = process.env.PORT || 3005;

const app = express();

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

// Use cors
const whitelist = ['http://localhost:3000','https://greentree-tracker.netlify.app']
app.use(cors({
  credentials: true,
    origin: function (origin,callback) {
        // Check each url in whitelist and see if it includes the origin (instead of matching exact string)
        const whitelistIndex = whitelist.findIndex((url) => url.includes(origin))
        console.log("found whitelistIndex", whitelistIndex)
        callback(null,whitelistIndex > -1)
    }
}));

app.use(session({
  // resave and saveUninitialized set to false for deprecation warnings
  secret: "Tyler and Katrina are awesome",
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 1800000
  },
  store: new MongoStore({
      mongooseConnection: mongoose.connection
  })
}));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');

app.use("/plants", plantRouter)
app.use("/auth", authRouter)
app.use("/users", usersRouter)
app.use("/admin", adminRouter)
app.use("/cart", cartRouter)
app.use("/quotes", quoteRouter)

console.log("port: ",process.env.PORT)
// console.log(process.env)

app.listen(port, () => {
  console.log(`Greentree Tracker app listening on port ${port}`)
})