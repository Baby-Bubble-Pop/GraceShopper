import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const EDIT_USER = 'EDIT_USER'
/**
 * INITIAL STATE
 */
const defaultUser = {
  cart: []
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const editUser = user => ({type: EDIT_USER, user})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    const cartRes = await axios.get(`/api/users/${res.data.id}`)
    res.data.cart = cartRes.data
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const addToCart = (userId, itemId, quantity) => async dispatch => {
  try {
    const body = {
      userId,
      itemId,
      quantity
    }

    const res = await axios.put('/api/users/addItems', body)
    dispatch(getUser(res.data || defaultUser))
  } catch (error) {
    console.error(error)
  }
}

export const deleteFromCart = (itemId, userId) => async dispatch => {
  try {
    await axios.delete(`/api/users/deleteItem/${itemId}`)
    const res = await axios.get('/auth/me')
    res.data.cart = await axios.get(`/api/users/${userId}`)
    dispatch(getUser(res.data || defaultUser))
  } catch (error) {
    console.error(error)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    res.data.cart = await axios.get(`/api/users/${res.data.id}`)
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const edit = updatedUser => async dispatch => {
  try {
    console.log(updatedUser)
    const res = await axios.put(`/api/users/${updatedUser.id}`, updatedUser)
    dispatch(editUser(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case EDIT_USER:
      return action.user
    default:
      return state
  }
}
