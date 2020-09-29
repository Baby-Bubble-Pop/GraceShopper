let defaultCart = []

const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const ADD_TO_ITEM = 'ADD_TO_ITEM'

export const addItem = (item, quantity) => {
  item.quantity = quantity
  return {
    type: ADD_ITEM,
    item
  }
}
export const addToItem = (index, quantity) => {
  return {
    type: ADD_TO_ITEM,
    index,
    quantity
  }
}
export const removeItem = itemIndex => ({
  type: REMOVE_ITEM,
  itemIndex
})

// REDUCER
export default function(state = defaultCart, action) {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.item]
    case ADD_TO_ITEM:
      let updatedCart = [...state]
      let newQuantity =
        Number(updatedCart[action.index].quantity) + Number(action.quantity)
      updatedCart[action.index].quantity = newQuantity
      return updatedCart
    case REMOVE_ITEM:
      let cart = [...state]
      cart.splice(action.index, 1)
      return cart
    default:
      return state
  }
}
