const express = require("express")
const { Musician } = require("../models/index")
const app = require("../src/app")

const musicianRouter = express.Router()

musicianRouter.get("/", async (req, res) => {
	let foundMusicians = await Musician.findAll({})
	res.json(foundMusicians)
})

musicianRouter.get("/:id", async (req, res) => {
	let musicianId = req.params.id
	let musician = await Musician.findByPk(musicianId)
	res.json(musician)
})

musicianRouter.post("/new", async (req, res) => {
	const createMusician = await Musician.create(req.body)
	res.json(createMusician)
})

musicianRouter.put("/:id", async (req, res) => {
	const musicianId = req.params.id
	const updateMusician = await Musician.update(req.body, { where: { id: musicianId } })
	res.json(updateMusician)
})

musicianRouter.delete("/:id", async (req, res) => {
	const musicianId = req.params.id
	const deleteMusician = await Musician.destroy({ where: { id: musicianId } })
	res.json(deleteMusician)
})

module.exports = musicianRouter
