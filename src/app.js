const express = require("express")
const app = express()
const { Musician, Band } = require("../models/index")
const { db } = require("../db/connection")
const musicianRouter = require("../routes/musicians")

const port = 3000

//TODO: Create a GET /musicians route to return all musicians

app.use(express.json())
app.use(express.urlencoded())

app.use("/musicians", musicianRouter)

app.get("/bands", async (req, res) => {
	let foundBands = await Band.findAll({})
	res.json(foundBands)
})

module.exports = app
