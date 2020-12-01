const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const plantRouter = require("./routes/plant_routes.js")

const port = 3000

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use("/plants", plantRouter)

app.listen(port, () => {
  console.log(`Greentree Tracker app listening on port ${port}`)
})