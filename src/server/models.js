const Sequelize = require("sequelize")
const db = new Sequelize(process.env.DB || 'postgres://postgres@localhost:5432/postgres')

class User extends Sequelize.Model {}
User.init({
  uuid: {
    type: Sequelize.UUID,
    primaryKey: true,
    unique: true,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  }, salt: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  }, password: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: "user",
})

db.sync({ force: true })

module.exports = { User }
