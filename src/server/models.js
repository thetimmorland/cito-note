const Sequelize = require("sequelize")
const db = new Sequelize(process.env.DB || 'postgres://postgres@localhost:5432/postgres')


class User extends Sequelize.Model {}
User.init({
  email: {
    type: Sequelize.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false,
  }, salt: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  }, hash: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: "user",
})


class Book extends Sequelize.Model {}
Book.init({
  uuid: {
    type: Sequelize.UUID,
    primaryKey: true,
    unique: true,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
  }, name: {
    type: Sequelize.STRING,
  }
}, {
  sequelize: db,
  modelName: "book",
})


db.sync({ force: true })
module.exports = {
  Book,
  User,
}
