const express = require("express")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", express.static('./dist'))

const { authRouter } = require("./auth")
app.use("/auth", authRouter)

app.listen(process.env.PORT || 8080)
