const express = require("express")
const authRouter = express.Router()

const crypto = require("crypto")
const jwt = require("jsonwebtoken")

const { User } = require("./models")

const SECRET = process.env.SECRET || "secret"

const generateSalt = () =>
  crypto.randomBytes(64).toString('base64')


const hashPassword = (salt, password) =>
  crypto.createHash("RSA-SHA512")
    .update(salt, + password)
    .digest("base64")


const issueAuthToken = user =>
  jwt.sign({
    data: user.get("uuid")
  }, SECRET, { expiresIn: "24h" })


authRouter.get("/", (req, res) => {
    const { email, password } = req.body
    User.findOne({ where: { email } })
      .then(user => {
        if (password === user.password) {
          res.send(issueAuthToken(user)).status(200)
        } else {
          res.sendStatus(403)
        }
      })
      .catch(res.sendStatus(403))
  })


authRouter.post("/", (req, res) => {
    const { email, password } = req.body
    const salt = generateSalt()
    const hash = hashPassword(salt, password)

    User.create({ email, salt, hash })
      .then(user => res.send(issueAuthToken(user)).status(200))
      .catch(() => res.sendStatus(500))
  })


function authMiddleware (req, res, next) {
  try {
    const accessToken = jwt.verify(req.get("authoriztion"), SECRET)
    res.body = { accessToken }
    next()
  } catch {
    res.sendStatus(403)
  }
}


module.exports = {
  authMiddleware,
  authRouter,
}
