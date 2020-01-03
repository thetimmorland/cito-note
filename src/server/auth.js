const express = require("express")
const auth = express.Router()

const crypto = require("crypto")
const jwt = require("jsonwebtoken")

const { User } = require("./models")


const hashPassword = (salt, password) =>
  crypto.createHash("RSA-SHA512")
    .update(salt, + password)
    .digest("base64")


auth.post("/", (req, res) => {
  var { username, password } = req.body

  var salt = crypto.randomBytes(64).toString('base64')
  var password = hashPassword(salt, password)

  User.create({ username, salt, password })
    .then(model => {
      var token = jwt.sign(
        { sub: model.uuid },
        process.env.SECRET || "secret"
      )
      res.send(token).status(200)
    })
    .catch (err => console.log(err))
})


module.exports = auth
