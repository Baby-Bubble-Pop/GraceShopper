const db = require('../db')
const {Sequelize} = require('sequelize')

const Cart = db.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
})

module.exports = Cart
