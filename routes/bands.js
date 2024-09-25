const express = require("express")
const { Band, Musician } = require("../models/index")
const app = require("../src/app")

const bandRouter = express.Router()

bandRouter.get("/", async (req, res) => {
	let foundBands = await Band.findAll({
		include: Musician,
	})
	res.json(foundBands)
})

bandRouter.get("/:id", async (req, res) => {
	let bandId = req.params.id
	let foundBand = await Band.findByPk(bandId, { include: Musician })
	res.json(foundBand)
})

module.exports = bandRouter
