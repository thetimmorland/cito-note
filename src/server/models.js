const Sequelize = require("sequelize")
const db = new Sequelize(process.env.DB || {
  dialect: "sqlite",
  storage: "dev_db.sqlite"
})


class User extends Sequelize.Model {}
User.init({
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    unique: true,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
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
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    unique: true,
    allowNull: false,
  }, name: {
    type: Sequelize.STRING,
  }
}, {
  sequelize: db,
  modelName: "book",
})

User.hasMany(Book)
Book.belongsTo(User)


db.sync()
module.exports = {
  Book,
  User,
}
