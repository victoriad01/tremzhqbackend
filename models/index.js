const dbConfig = require('../config/dbConfig.js')
const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
})

sequelize
  .authenticate()
  .then(() => {
    console.log('connected..')
  })
  .catch((err) => {
    console.log('Error' + err)
  })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./userModel.js')(sequelize, DataTypes)
db.products = require('./productModel.js')(sequelize, DataTypes)
db.productparts = require('./productpartsModel.js')(sequelize, DataTypes)

db.sequelize.sync({ force: false }).then(() => {
  console.log('yes re-sync done')
})

// 1 to Many Relation
db.products.hasMany(db.productparts, {
  foreignKey: 'product_id',
  as: 'productpart',
  onDelete: 'cascade',
})

db.productparts.belongsTo(db.products, {
  foreignKey: 'product_id',
  as: 'product',
})

db.users.hasMany(db.products, {
  foreignKey: 'user_id',
  as: 'product',
  onDelete: 'cascade',
})

db.products.belongsTo(db.users, {
  foreignKey: 'user_id',
  as: 'user',
})

module.exports = db
