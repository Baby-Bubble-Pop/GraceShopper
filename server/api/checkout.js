const router = require('express').Router()
const {BillingInfo, ShippingInfo} = require('../db/models')

module.exports = router

//POST NEW SHIPPING INFO
router.post('/shipping', async (req, res, next) => {
  try {
    const newShippingInfo = await ShippingInfo.create(req.body)
    console.log('REQ.BODY SHIPPING', req.body)
    res.json(newShippingInfo)
  } catch (error) {
    next(error)
  }
})

//POST NEW BILLING INFO
router.post('/billing', async (req, res, next) => {
  try {
    const newBillingInfo = await BillingInfo.create(req.body)
    console.log('REQ.BODY BILLING', req.body)
    res.json(newBillingInfo)
  } catch (error) {
    next(error)
  }
})
