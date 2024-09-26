const express = require("express")
const { Musician } = require("../models/index")
const app = require("../src/app")
const { check, validationResult } = require("express-validator")

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

musicianRouter.post(
	"/new",
	[check(["name", "instrument"]).not().isEmpty().trim(), check(["name", "instrument"]).isLength({ min: 2, max: 20 })],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			res.json({ error: errors.array() })
		} else {
			const createMusician = await Musician.create(req.body)
			res.json(createMusician)
		}
	}
)

musicianRouter.put("/:id", [check("name").isLength({ min: 2, max: 20 }), check("instrument").isLength({ min: 2, max: 20 })], async (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		res.json({ error: errors.array() })
	} else {
		const musicianId = req.params.id
		const updateMusician = await Musician.update(req.body, { where: { id: musicianId } })
		res.json(updateMusician)
	}
})

musicianRouter.delete("/:id", async (req, res) => {
	const musicianId = req.params.id
	const deleteMusician = await Musician.destroy({ where: { id: musicianId } })
	res.json(deleteMusician)
})

module.exports = musicianRouter
