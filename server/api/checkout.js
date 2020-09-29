const router = require('express').Router()
const {BillingInfo, ShippingInfo, User, Order} = require('../db/models')
const Sequelize = require('sequelize')
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
router.post('/confirm', async (req, res, next) => {
  let products = req.body.cart.products.map(item => {
    return JSON.stringify(item)
  })
  let shippingInfo = JSON.stringify(req.body.shippingInfo)
  let billingInfo = JSON.stringify(req.body.billingInfo)
  try {
    const newOrder = await Order.create({
      totalPrice: req.body.cart.totalPrice,
      products,
      shippingInfo,
      billingInfo
    })
    if (req.user) {
      // If the user is logged in, add to their purchase history
      let user = await User.findByPk(req.user.id)
    }
    res.json(newOrder)
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
