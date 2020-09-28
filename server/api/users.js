const router = require('express').Router()
const {User, Item, Cart} = require('../db/models')
const {
  isAdmin,
  isSameUserOrAdmin,
  isEngineer,
  isSameUserOrEngineer
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

router.delete('/deleteItem/:id', async (req, res, next) => {
  try {
    await Cart.destroy({
      where: {
        itemId: req.params.id
      }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

// PUT /api/users/:id
router.put('/:id', isSameUserOrEngineer, async (req, res, next) => {
  if (req.user.role === 'user') {
    if (req.body.role !== 'user') {
      const error = new Error('You must be an engineer to change roles!')
      error.status = 403
      next(error)
    }
  }
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
