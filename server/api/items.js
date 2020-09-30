const router = require('express').Router()
const {Item} = require('../db/models')
const {isAdmin} = require('../utils/securityMiddleware')

module.exports = router

// GET /api/items
router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll()
    res.json(items)
  } catch (err) {
    next(err)
  }
})

// POST /api/items
router.post('/', isAdmin, async (req, res, next) => {
  try {
    const item = await Item.create(req.body)
    res.json(item)
  } catch (err) {
    next(err)
  }
})

// GET /api/items/:id
router.get('/:id', async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id)
    if (item !== null) {
      res.send(item)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

// POST /api/items
router.post('/', isAdmin, async (req, res, next) => {
  try {
    const newItem = await Item.create(req.body)
    res.status(201).send(newItem)
  } catch (err) {
    next(err)
  }
})

// PUT /api/items/addItems
router.put('/addItems', async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.body.itemId)
    await item.decrement({quantity: req.body.quantity})
    res.send(item)
  } catch (err) {
    next(err)
  }
})

// PUT /api/items/:id
router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    const [updatedItemCount, updatedItem] = await Item.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true
    })
    if (updatedItemCount === 1) {
      res.send(updatedItem[0])
    }
  } catch (err) {
    next(err)
  }
})

// DELETE /api/items/:id
router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    await Item.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(204).redirect('/items')
  } catch (err) {
    next(err)
  }
})
