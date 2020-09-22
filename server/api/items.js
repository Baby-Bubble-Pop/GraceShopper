const router = require('express').Router()
const {User, Item} = require('../db/models')

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

// GET /api/items/:id
router.get('/:id', async (req, res, next) => {
  try {
    const {data: item} = await Item.findByPk(req.params.id)
    res.send(item)
  } catch (error) {
    next(error)
  }
})

// POST /api/items
router.post('/', async (req, res, next) => {
  try {
    const newItem = await Item.create(req.body)
    res.status(201).send(newItem)
  } catch (err) {
    next(err)
  }
})

// PUT /api/items/:id
router.put('/:id', async (req, res, next) => {
  try {
    const [updatedItemCount, updatedItem] = await Item.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true
    })
    if (updatedItemCount === 1) {
      res.send(updatedItem[0])
      // res.redirect("/items/" + updatedItem[0].id);
    }
  } catch (err) {
    next(err)
  }
})

// DELETE /api/items/:id
router.delete('/:id', async (req, res, next) => {
  try {
    await Item.destroy({
      where: {
        id: req.params.id
      }
    })
    res.redirect('/items')
  } catch (err) {
    next(err)
  }
})
