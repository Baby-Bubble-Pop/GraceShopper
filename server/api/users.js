const router = require('express').Router()
const {User, Item} = require('../db/models')

module.exports = router

// GET /api/users
router.get('/', async (req, res, next) => {
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

// GET /api/users/:id
router.get('/:id', async (req, res, next) => {
  try {
    const userData = await User.findByPk(req.params.id, {include: Item})
    res.send(userData.items)
  } catch (error) {
    next(error)
  }
})
