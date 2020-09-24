const User = require('./user')
const Item = require('./item')
const Cart = require('./cart')
const ShippingInfo = require('./shippingInfo')
const BillingInfo = require('./billingInfo')
const Order = require('./Order')

User.belongsToMany(Item, {
  through: {
    model: Cart,
    unique: false
  },
  constraints: false
})

Item.belongsToMany(User, {
  through: {
    model: Cart,
    unique: false
  },
  constraints: false
})
Order.hasMany(Item)
Item.belongsTo(Order)

User.hasMany(ShippingInfo)
ShippingInfo.belongsTo(User)
User.hasMany(BillingInfo)
BillingInfo.belongsTo(User)

Item.hasMany(Cart)
Cart.belongsTo(Item)
User.hasOne(Cart)
Cart.belongsTo(User)

module.exports = {
  User,
  Item,
  Cart,
  ShippingInfo,
  BillingInfo,
  Order
}
