// install dependencies
const { execSync } = require("child_process")
execSync("npm install")
execSync("npm run seed")

const request = require("supertest")
const { db } = require("./db/connection")
const { Musician, Band } = require("./models/index")
const app = require("./src/app")
const { seedMusician } = require("./seedData")

describe("./musicians endpoint", () => {
	// Write your tests here
	it("testing musicians endpoint", async () => {
		const response = await request(app).get("/musicians")
		expect(response.statusCode).toBe(200)
	})
	it("testing musicians properties", async () => {
		const response = await request(app).get("/musicians/1")
		const responseData = JSON.parse(response.text)
		expect(responseData.name).toBe("Mick Jagger")
		expect(responseData.instrument).toBe("Voice")
		expect(responseData.id).toBe(1)
	})
	it("testing create endpoint", async () => {
		const newMusician = { name: "Stevie", instrument: "Voice" }

		const response = await request(app).post("/musicians/new").send(newMusician).expect(200)

		const createdMusician = await Musician.findByPk(response.body.id)
		expect(createdMusician.instrument).toBe(newMusician.instrument)
	})

	it("testing update endpoint", async () => {
		const update = { name: "Stevie Wonder" }
		const response = await request(app).put("/musicians/4").send(update).expect(200)
		const musician = await Musician.findByPk(4)
		expect(musician.name).toBe("Stevie Wonder")
	})

	it("testing delete endpoint", async () => {
		const response = await request(app).delete("/musicians/4").expect(200)
		const musicians = await Musician.findAll({})
		expect(musicians.length).toBe(3)
	})
})

describe("Bands", () => {
	it("testing bands endpoint", async () => {
		const response = await request(app).get("/bands")
		expect(response.statusCode).toBe(200)
	})
	it("testing bands properties", async () => {
		const response = await request(app).get("/bands")
		const responseData = JSON.parse(response.text)
		expect(responseData[0].name).toBe("The Beatles")
		expect(responseData[1].genre).toBe("Pop")
		expect(responseData[2].id).toBe(3)
	})
})
