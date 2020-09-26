const router = require('express').Router()
const {reset} = require('nodemon')
const {Sequelize} = require('sequelize')
const {User, Item, Cart} = require('../db/models')
const {
  isAdmin,
  isUser,
  isSameUserOrAdmin,
  isEngineer
} = require('../utils/securityMiddleware')

module.exports = router

router.get('/', isAdmin, async (req, res, next) => {
  // GET /api/users
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', isSameUserOrAdmin, async (req, res, next) => {
  // GET /api/users/:id

  try {
    const userData = await User.findByPk(req.params.id, {include: Item})
    res.send(userData.items)
  } catch (error) {
    next(error)
  }
})

//IN CART MODEL:
//added two new fields for userId and itemId
//also added a quantity field as Matt correctly suggested-- adding a quantity field removes the need for duplicate entries

//IN USER/ITEM ASSOCIATIONS IN DB/INDEX FILE
//added a new 'foreign key' field to both associations, with unique set to false

//doing the whole foreign key setup above allowed us to have duplicate entries in the Cart table,
//which is what we were having issues with before.
//at least I think that's what it accomplished, that was 2 hours ago and I already forgot -.-'

//However, once I added the quantity field to the Cart model like you suggested, I think the above
//became unneeded, cause then with the quantity field I just did the following in our route:

//IN THE ROUTE BELOW
//first checked to see if the user already has that item in their cart
//if they don't, CREATE a new cart instance (aka add to cart)
//if they do, UPDATE the quantity on that existing cart instance

//IN THE CART COMPONENT
//just edited to add an extra field to display the quantity lol

//ADD TO CART
router.put('/addItems', async (req, res, next) => {
  try {
    const checkForCart = await Cart.findAll({
      where: {
        userId: req.body.userId,
        itemId: req.body.itemId
      }
    })
    const item = await Item.findByPk(req.body.itemId)

    if (!checkForCart.length) {
      console.log(typeof req.body.quantity)
      console.log(typeof item.quantity)
      if (req.body.quantity > item.quantity) {
        throw new Error('Quantity exceeds maximum available')
      }
      await Cart.create({
        userId: req.body.userId,
        itemId: req.body.itemId,
        quantity: req.body.quantity
      })
      const user = await User.findByPk(req.body.userId)
      res.send(user)
    } else {
      if (
        Number(req.body.quantity) + checkForCart[0].quantity >
        item.quantity
      ) {
        throw new Error('Quantity exceeds maximum available')
      }
      await checkForCart[0].increment({
        quantity: req.body.quantity
      })

      const user = await User.findByPk(req.body.userId)
      res.send(user)
    }
  } catch (err) {
    next(err)
  }
})

// PUT /api/users/:id
router.put('/:id', isEngineer, async (req, res, next) => {
  try {
    const [updatedUserCount, updatedUser] = await User.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true
    })
    if (updatedUserCount === 1) {
      res.send(updatedUser[0])
    }
  } catch (err) {
    next(err)
  }
})

// DELETE /api/users/:id
router.delete('/:id', isEngineer, async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(204).redirect('/users')
  } catch (err) {
    next(err)
  }
})
