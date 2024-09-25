const express = require("express")
const app = express()
const { db } = require("../db/connection")
const musicianRouter = require("../routes/musicians")
const bandRouter = require("../routes/bands")

app.use(express.json())
app.use(express.urlencoded())

app.use("/musicians", musicianRouter)
app.use("/bands", bandRouter)

module.exports = app
