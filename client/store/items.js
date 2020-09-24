import axios from 'axios'

//INITIAL STATE
const initialItems = []

//ACTION TYPES
const GET_ITEMS = 'GET_ITEMS'

//ACTION CREATORS
const getItems = items => ({type: GET_ITEMS, items})

//THUNK CREATORS
export const fetchItems = () => async dispatch => {
  try {
    const response = await axios.get('/api/items')
    dispatch(getItems(response.data))
  } catch (error) {
    console.error('Error in fetchItems thunk creator')
    throw error
  }
}

//REDUCER
export default function(state = initialItems, action) {
  switch (action.type) {
    case GET_ITEMS:
      return action.items
    default:
      return state
  }
}
