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
    type: Sequelize.DECIMAL,
    allowNull: false,
    get() {
      return Number(parseFloat(this.getDataValue('price')).toFixed(2))
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

//turns price into # of pennies
// Item.addHook('beforeCreate', (item, options) => {
//   item.price = Number(parseFloat(item.price).toFixed(2))
// })

module.exports = Item
