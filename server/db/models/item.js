const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    get() {
      return parseFloat(this.getDataValue('price'))
    }
  },
  rating: {
    type: Sequelize.DECIMAL(2, 1),
    validate: {
      min: 1,
      max: 5
    },
    get() {
      return parseFloat(this.getDataValue('rating'))
    }
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  image: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://upload.wikimedia.org/wikipedia/commons/4/4f/3_D-Box.jpg'
  }
})

module.exports = Item
