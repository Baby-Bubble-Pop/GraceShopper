const User = require('./user')
const Item = require('./item')
const Cart = require('./cart')

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

module.exports = {
  User,
  Item,
  Cart
}
