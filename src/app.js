const express = require("express")
const app = express()
const { Musician, Band } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000

//TODO: Create a GET /musicians route to return all musicians

app.get("/musicians", async (req, res) => {
	let foundMusicians = await Musician.findAll({})
	res.json(foundMusicians)
})

app.get("/musicians/1", async (req, res) => {
	let foundFirst = await Musician.findByPk(1)
	res.json(foundFirst)
})

app.get("/musicians/2", async (req, res) => {
	let foundSecond = await Musician.findByPk(2)
	res.json(foundSecond)
})

app.get("/musicians/3", async (req, res) => {
	let foundThird = await Musician.findByPk(3)
	res.json(foundThird)
})

app.get("/bands", async (req, res) => {
	let foundBands = await Band.findAll({})
	res.json(foundBands)
})

module.exports = app
