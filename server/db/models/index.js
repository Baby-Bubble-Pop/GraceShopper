const User = require('./user')
const Item = require('./item')
const db = require('../db')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

const Cart = db.define('cart', {})

User.belongsToMany(Item, {
  through: Cart
})

Item.belongsToMany(User, {
  through: Cart
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
