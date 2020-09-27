import axios from 'axios'

//INIIAL STATE
const initialState = {
  shippingInfo: {},
  billingInfo: {}
}

//ACTION TYPES
const CREATED_NEW_SHIPPINGINFO = 'CREATE_NEW_SHIPPINGINFO'
const CREATED_NEW_BILLINGINFO = 'CREATE_NEW_BILLINGINFO'

//ACTION CREATORS
const createdNewShippingInfo = shippingInfo => ({
  type: CREATED_NEW_SHIPPINGINFO,
  shippingInfo
})
const createdNewBillingInfo = billingInfo => ({
  type: CREATED_NEW_BILLINGINFO,
  billingInfo
})

//THUNK CREATORS
export const createNewShippingInfo = shippingInfo => async dispatch => {
  try {
    const res = await axios.post('/api/checkout/shipping', shippingInfo)
    dispatch(createdNewShippingInfo(res.data))
  } catch (error) {
    console.error(
      'Something went wrong with the new shipping info thunk creator!'
    )
  }
}

export const createNewBillingInfo = billingInfo => async dispatch => {
  try {
    const res = await axios.post('/api/checkout/billing', billingInfo)
    dispatch(createdNewBillingInfo(res.data))
  } catch (error) {
    console.error(
      'Something went wrong with the new billing info thunk creator!'
    )
  }
}

//REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case CREATED_NEW_SHIPPINGINFO:
      return {...state, shippingInfo: action.shippingInfo}
    case CREATED_NEW_BILLINGINFO:
      return {...state, billingInfo: action.billingInfo}
    default:
      return state
  }
}
