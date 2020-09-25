const router = require('express').Router()
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

//ADD TO CART
router.put('/addItems', async (req, res, next) => {
  try {
    const newCartItem = await Cart.create({
      userId: req.body.userId,
      itemId: req.body.itemId
    })
    const user = await User.findByPk(req.body.userId)
    // const items = await user.getItems()
    // const item = await Item.findByPk(req.body.itemId)
    // items.push(item)
    // await user.addItems(items)

    // user.addItem(req.body.itemId)
    res.send(user)
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
