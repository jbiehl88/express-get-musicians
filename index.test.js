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
		const response = await request(app).get("/musicians")
		const responseData = JSON.parse(response.text)
		expect(responseData[0].name).toBe("Mick Jagger")
		expect(responseData[1].instrument).toBe("Voice")
		expect(responseData[2].id).toBe(3)
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
