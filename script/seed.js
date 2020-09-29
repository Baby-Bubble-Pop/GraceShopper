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

const yachts = []
const getRandomYachtSpecs = (min, max) => {
  return Math.random() * (max - min) + min
}

const yachtGenerator = num => {
  for (let i = 1; i < num; i++) {
    yachts.push({
      name: `Mega-yacht ${i}`,
      VAT: 0.1 * getRandomYachtSpecs(1000000, 3000000000),
      price: getRandomYachtSpecs(1000000, 3000000000),
      quantity: Math.trunc(getRandomYachtSpecs(1, 10)),
      grossRegisteredTonnage: Math.trunc(getRandomYachtSpecs(30, 10000)),
      guests: Math.trunc(getRandomYachtSpecs(10, 100)),
      beam: getRandomYachtSpecs(5, 15),
      draft: getRandomYachtSpecs(3, 10),
      length: getRandomYachtSpecs(20, 150)
    })
  }
  return yachts
}

yachtGenerator(100)

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
  {itemId: 5, userId: 2},
  {itemId: 6, userId: 2},
  {itemId: 7, userId: 2},
  {itemId: 8, userId: 2},
  {itemId: 9, userId: 3},
  {itemId: 10, userId: 3},
  {itemId: 11, userId: 3},
  {itemId: 12, userId: 3},
  {itemId: 13, userId: 4},
  {itemId: 14, userId: 4},
  {itemId: 15, userId: 4},
  {itemId: 16, userId: 4},
  {itemId: 17, userId: 5},
  {itemId: 18, userId: 5},
  {itemId: 19, userId: 5},
  {itemId: 20, userId: 5}
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
    yachts.map(yacht => {
      return Item.create(yacht)
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
