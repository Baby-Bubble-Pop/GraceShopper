const User = require('./user')
const Item = require('./item')
const Cart = require('./cart')
const BillingInfo = require('./billingInfo')

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

User.hasMany(BillingInfo)

Item.hasMany(Cart)
Cart.belongsTo(Item)
User.hasOne(Cart)
Cart.belongsTo(User)

module.exports = {
  User,
  Item,
  Cart,
  BillingInfo
}
