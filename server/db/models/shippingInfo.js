const Sequelize = require('sequelize')
const db = require('../db')

const ShippingInfo = db.define('shippingInfo', {
  streetAddressLine1: {
    type: Sequelize.TEXT,
    allowNull: false
  },

  streetAddressLine2: {
    type: Sequelize.TEXT
  },

  aptSuiteNo: {
    type: Sequelize.STRING
  },

  city: {
    type: Sequelize.STRING,
    allowNull: false
  },

  state: {
    type: Sequelize.ENUM(
      'AL',
      'AK',
      'AZ',
      'AR',
      'CA',
      'CO',
      'CT',
      'DE',
      'FL',
      'GA',
      'HI',
      'ID',
      'IL',
      'IN',
      'IA',
      'KS',
      'KY',
      'LA',
      'ME',
      'MD',
      'MA',
      'MI',
      'MN',
      'MS',
      'MO',
      'MT',
      'NE',
      'NV',
      'NH',
      'NJ',
      'NM',
      'NY',
      'NC',
      'ND',
      'OH',
      'OK',
      'OR',
      'PA',
      'RI',
      'SC',
      'SD',
      'TN',
      'TX',
      'UT',
      'VT',
      'VA',
      'WA',
      'WV',
      'WI',
      'WY'
    ),
    allowNull: false
  },

  zipCode: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = ShippingInfo
