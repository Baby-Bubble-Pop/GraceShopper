'use strict'
const db = require('../server/db')
const {User, Item, Cart} = require('../server/db/models')
const users = []
const userGenerator = num => {
  for (let i = 1; i < num; i++) {
    users.push({
      email: `${i}@email.com`,
      password: `${i}`
    })
  }
  return users
}
userGenerator(100)
const items = []
const itemGenerator = num => {
  for (let i = 1; i < num; i++) {
    items.push({
      name: `${i}`,
      price: `${i}`
    })
  }
  return items
}
itemGenerator(100)
const admins = []
const adminGenerator = num => {
  for (let i = 1; i < num; i++) {
    admins.push({
      email: `admin-${i}@email.com`,
      password: `admin${i}`,
      role: `admin`
    })
  }
  return admins
}
adminGenerator(15)

const carts = [
  {itemId: 1, userId: 1},
  {itemId: 2, userId: 1},
  {itemId: 3, userId: 1},
  {itemId: 4, userId: 1},
  {itemId: 1, userId: 2},
  {itemId: 3, userId: 2},
  {itemId: 4, userId: 2},
  {itemId: 5, userId: 2},
  {itemId: 1, userId: 3},
  {itemId: 1, userId: 3},
  {itemId: 1, userId: 3},
  {itemId: 1, userId: 3},
  {itemId: 2, userId: 4},
  {itemId: 3, userId: 4},
  {itemId: 4, userId: 4},
  {itemId: 5, userId: 4},
  {itemId: 2, userId: 5},
  {itemId: 3, userId: 5},
  {itemId: 4, userId: 5},
  {itemId: 5, userId: 5}
]
async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await Promise.all(
    users.map(user => {
      return User.create(user)
    })
  )
  await Promise.all(
    items.map(item => {
      return Item.create(item)
    })
  )
  await Promise.all(
    carts.map(cart => {
      return Cart.create(cart)
    })
  )
  await Promise.all(
    admins.map(admin => {
      return User.create(admin)
    })
  )
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}
// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}
// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}
// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
