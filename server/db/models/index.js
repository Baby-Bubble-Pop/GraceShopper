const User = require('./user')
const Item = require('./item')
const Cart = require('./cart')
const BillingInfo = require('./billingInfo')
const ShippingInfo = require('./shippingInfo')

User.belongsToMany(Item, {
  through: {
    model: Cart,
    unique: false,
    foreignKey: {
      name: 'userId',
      unique: false
    }
  },
  constraints: false
})

Item.belongsToMany(User, {
  through: {
    model: Cart,
    unique: false,
    foreignKey: {
      name: 'itemId',
      unique: false
    }
  },
  constraints: false
})

Item.hasMany(Cart)
Cart.belongsTo(Item)
User.hasOne(Cart)
Cart.belongsTo(User)
User.hasOne(ShippingInfo, {foreignKey: 'userId', allowNull: false})
ShippingInfo.belongsTo(User)
User.hasOne(BillingInfo, {foreignKey: 'userId', allowNull: false})
BillingInfo.belongsTo(User)

module.exports = {
  User,
  Item,
  Cart,
  BillingInfo,
  ShippingInfo
}
