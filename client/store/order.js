import axios from 'axios'

//INITIAL STATE
const initialOrder = {
  shippingInfo: {},
  billingInfo: {},
  cart: {
    totalPrice: '',
    products: []
  }
}

//ACTION TYPES
const GOT_SHIPPING_INFO = 'GOT_SHIPPING_INFO'
const GOT_BILLING_INFO = 'GOT_BILLING_INFO'
const GOT_CART = 'GOT_CART'
const SUBMITTED_ORDER = 'SUBMITTED_ORDER'

//ACTION CREATORS
const gotShippingInfo = shippingInfo => ({
  type: GOT_SHIPPING_INFO,
  shippingInfo
})

const gotBillingInfo = billingInfo => ({
  type: GOT_BILLING_INFO,
  billingInfo
})

const gotCart = cart => ({
  type: GOT_CART,
  cart
})

const submittedOrder = order => ({
  type: SUBMITTED_ORDER,
  order
})

//THUNK CREATOR

export const getShippingInfo = shippingInfo => dispatch => {
  dispatch(gotShippingInfo(shippingInfo))
}

export const getBillingInfo = billingInfo => dispatch => {
  dispatch(gotBillingInfo(billingInfo))
}

export const getCart = cart => dispatch => {
  const orderCart = {
    totalPrice: 0,
    products: []
  }

  cart.map(item => {
    orderCart.totalPrice += item.price * item.cart.quantity
    const product = {
      id: item.cart.id,
      name: item.name,
      quantity: item.cart.quantity,
      price: item.price
    }
    orderCart.products.push(product)
  })

  dispatch(gotCart(orderCart))
}

export const submitOrder = order => async dispatch => {
  try {
    const res = await axios.post('/api/checkout/confirm', order)
    dispatch(submittedOrder(res.data))
  } catch (error) {
    console.error('There was an error with your submit order thunk creator!')
  }
}

//REDCUER
export default function(state = initialOrder, action) {
  switch (action.type) {
    case GOT_SHIPPING_INFO:
      return {...state, shippingInfo: action.shippingInfo}
    case GOT_BILLING_INFO:
      return {...state, billingInfo: action.billingInfo}
    case GOT_CART:
      return {...state, cart: action.cart}
    case SUBMITTED_ORDER:
      return action.order
    default:
      return state
  }
}
