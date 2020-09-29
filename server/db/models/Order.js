const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  totalPrice: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  products: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  shippingInfo: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  billingInfo: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = Order
