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
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  grossRegisteredTonnage: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  guests: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  beam: {
    type: Sequelize.DECIMAL,
    defaultValue: 0
  },
  draft: {
    type: Sequelize.DECIMAL,
    defaultValue: 0
  },
  length: {
    type: Sequelize.DECIMAL,
    defaultValue: 0
  },
  image: {
    type: Sequelize.TEXT,
    defaultValue: 'https://media4.giphy.com/media/Veqe3tZNFqX6izIEZm/giphy.gif'
  },
  category: {
    type: Sequelize.ENUM('big', 'huge', 'mega'),
    defaultValue: 'big'
  }
})

//put yacht in category based on size
Item.addHook('beforeCreate', (item, options) => {
  if (item.length < 50) {
    item.category = 'big'
  } else if (item.length >= 50 && item.length < 100) {
    item.category = 'huge'
  } else {
    item.category = 'mega'
  }
})

module.exports = Item
