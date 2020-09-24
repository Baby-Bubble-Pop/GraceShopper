const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  historicalPrice: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  productCount: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = Order
