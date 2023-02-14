const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")

const openaiRouter = require("./router/openai")
const spotifyRouter = require("./router/spotify")

const app = express()

app.use(express.json())
app.use(cors())

// Routes
app.use(openaiRouter)
app.use(spotifyRouter)

app.get("/", (req, res) => {
  res.send("Hello World!")
})

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log("Server is running on port 3001")
})
