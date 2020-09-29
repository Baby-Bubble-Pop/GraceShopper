import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import items from './items'
import singleItem from './singleItem'
import guestCart from './guestCart'

const reducer = combineReducers({user, items, singleItem, guestCart})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './items'
export * from './singleItem'
export * from './guestCart'
