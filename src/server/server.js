const express = require("express")
const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.use("/", express.static('./dist'))

const { authRouter } = require("./auth")
server.use("/api/auth", authRouter)

const { userRouter } = require("./user")
server.use("/api/user", userRouter)

server.listen(process.env.PORT || 8080)
