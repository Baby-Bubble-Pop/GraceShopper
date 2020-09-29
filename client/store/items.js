import axios from 'axios'

//INITIAL STATE
const initialItems = []

//ACTION TYPES
const GET_ITEMS = 'GET_ITEMS'
const ADD_ITEM = 'ADD_ITEM'

//ACTION CREATORS
const getItems = items => ({type: GET_ITEMS, items})
const addItem = item => ({type: ADD_ITEM, item})

//THUNK CREATORS
export const fetchItems = () => async dispatch => {
  try {
    const response = await axios.get('/api/items')
    dispatch(getItems(response.data))
  } catch (error) {
    console.error('Error in fetchItems thunk creator', error)
    throw error
  }
}
export const createItem = item => async dispatch => {
  try {
    const response = await axios.post('/api/items', item)
    dispatch(addItem(response.data))
  } catch (error) {
    console.error('Error in createItem thunk creator', error)
    throw error
  }
}

//REDUCER
export default function(state = initialItems, action) {
  switch (action.type) {
    case GET_ITEMS:
      return action.items
    case ADD_ITEM:
      return [...state, action.item]
    default:
      return state
  }
}
