const router = require('express').Router()
const {BillingInfo, ShippingInfo, User} = require('../db/models')

module.exports = router

//POST NEW SHIPPING INFO
router.post('/shipping', async (req, res, next) => {
  try {
    const newShippingInfo = await ShippingInfo.create(req.body.shippingInfo)
    const user = await User.findByPk(req.body.userId)
    user.setShippingInfo(newShippingInfo)
    // console.log('REQ.BODY SHIPPING', req)
    res.json(newShippingInfo)
  } catch (error) {
    next(error)
  }
})

//POST NEW BILLING INFO
router.post('/billing', async (req, res, next) => {
  try {
    const newBillingInfo = await BillingInfo.create(req.body.billingInfo)
    const user = await User.findByPk(req.body.userId)
    user.setBillingInfo(newBillingInfo)
    // console.log('REQ.BODY BILLING', req.body)
    res.json(newBillingInfo)
  } catch (error) {
    next(error)
  }
})

//GET SHIPPING AND BILLING INFO FOR FINAL CONFIRMATION
router.get('/confirm', async (req, res, next) => {
  try {
    console.log('GET SHIPPING REQ', req.body)
    const shippingInfo = await ShippingInfo.findAll({
      where: {
        userId: req.body.userId
      }
    })
    res.json(shippingInfo)
  } catch (error) {
    next(error)
  }
})

//refactor billing and Shipping Info and associate them to user table- DONE I THINK
//update checkout store so that they can get that route
//order confirmation page should pull cart info from this.props.user.data.cart
//order confirmation page should pull billing info from this.props.user.billing
//order confirmation page should pull shipping info from this.props.user.shipping
//order confirmation page should add up price of items and add tax and shipping fees
