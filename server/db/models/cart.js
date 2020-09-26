const db = require('../db')
const {Sequelize} = require('sequelize')

const Cart = db.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  userId: Sequelize.INTEGER,
  itemId: Sequelize.INTEGER
})

module.exports = Cart
