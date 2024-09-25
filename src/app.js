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

// app.get("/musicians", async (req, res) => {
// 	let foundMusicians = await Musician.findAll({})
// 	res.json(foundMusicians)
// })

// app.get("/musicians/:id", async (req, res) => {
// 	let musicianId = req.params.id
// 	let musician = await Musician.findByPk(musicianId)
// 	res.json(musician)
// })

app.get("/bands", async (req, res) => {
	let foundBands = await Band.findAll({})
	res.json(foundBands)
})

// app.post("/musicians/new", async (req, res) => {
// 	const createMusician = await Musician.create(req.body)
// 	res.json(createMusician)
// })

// app.put("/musicians/:id", async (req, res) => {
// 	const musicianId = req.params.id
// 	const updateMusician = await Musician.update(req.body, { where: { id: musicianId } })
// 	res.json(updateMusician)
// })

// app.delete("/musicians/:id", async (req, res) => {
// 	const musicianId = req.params.id
// 	const deleteMusician = await Musician.destroy({ where: { id: musicianId } })
// 	res.json(deleteMusician)
// })

module.exports = app
