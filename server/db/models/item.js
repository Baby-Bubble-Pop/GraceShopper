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
  VAT: {
    type: Sequelize.DECIMAL
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
  grossRegisteredTonnage: {
    type: Sequelize.INTEGER
  },
  guests: {
    type: Sequelize.INTEGER
  },
  beam: {
    type: Sequelize.DECIMAL
  },
  draft: {
    type: Sequelize.DECIMAL
  },
  length: {
    type: Sequelize.DECIMAL
  },
  image: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://www.esquireme.com/public/styles/full_img/public/images/2019/08/04/jeff-bezos-yacht.jpg'
  }
})

// turns price into # of pennies
// Item.addHook('beforeCreate', (item, options) => {
//   item.price = Number(parseFloat(item.price).toFixed(2))
// })

module.exports = Item
