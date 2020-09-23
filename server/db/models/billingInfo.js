const Sequelize = require('sequelize')
const db = require('../db')

const BillingInfo = db.define('billingInfo', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  creditCardNumber: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  cvv: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  expirationDate: {
    type: Sequelize.DATE,
    allowNull: false
  }
})

module.exports = BillingInfo
