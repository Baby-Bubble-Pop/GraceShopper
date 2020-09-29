let defaultCart = []

const ADD_ITEM = 'ADD_ITEM'
const UPDATE_CART = 'UPDATE_CART'

export const addItem = (item, quantity) => {
  let itemCopy = {
    id: item.id,
    name: item.name,
    price: item.price,
    quantity
  }
  return {
    type: ADD_ITEM,
    item: itemCopy
  }
}
export const updateCart = cart => {
  return {
    type: UPDATE_CART,
    cart
  }
}

// REDUCER
export default function(state = defaultCart, action) {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.item]
    case UPDATE_CART:
      return action.cart
    default:
      return state
  }
}
