import axios from 'axios'

//INITIAL STATE
const singleItem = {}

//ACTION TYPES
const GET_SINGLE_ITEM = 'GET_SINGLE_ITEM'

//ACTION CREATORS
const getSingleItem = item => ({type: GET_SINGLE_ITEM, item})

//THUNK CREATORS
export const fetchSingleItem = itemId => async dispatch => {
  try {
    const response = await axios.get(`/api/items/${itemId}`)
    dispatch(getSingleItem(response.data))
  } catch (error) {
    console.error('Error in fetchSingleItem thunk creator')
    throw error
  }
}

//REDUCER
export default function(state = singleItem, action) {
  switch (action.type) {
    case GET_SINGLE_ITEM:
      return action.item
    default:
      return state
  }
}
