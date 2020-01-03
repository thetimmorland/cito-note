const express = require("express")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", express.static('./dist'))

const auth = require("./auth")
app.use("/api/auth", auth)

app.listen(process.env.PORT || 8080)
