const { Musician, Band } = require("./models/index")
const { db } = require("./db/connection")
const { seedMusician, seedBand } = require("./seedData")

const syncSeed = async () => {
	await db.sync({ force: true })
	seedMusician.map((musician) => Musician.create(musician))
	seedBand.map((band) => Band.create(band))

	let band1 = await Band.findByPk(1)
	let musician1 = await Musician.findByPk(1)
	await musician1.setBand(band1)
}

syncSeed()
