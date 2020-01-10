const express = require("express")
const userRouter = express.Router()

const Book = require("./models")
const jwt = require("jwt")

app.use("/:id", (req, res, next) => {
  try {
    jwt.verify(req.headers.authoriztion)
    next()
  } catch {
    res.sendStatus(403)
  }
})

userRouter.post("/:id/books", (req, res) => {
  Book.create()
    .then(book => res.send(book))
})

userRouter.get("/:id/books", (req, res) => {
  Book.findAll()
    .then(books => res.send(books))
})

module.exports = { userRouter }
