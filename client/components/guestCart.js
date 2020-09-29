import React from 'react'
import {connect} from 'react-redux'
import {addItem, addToItem, removeItem} from '../store/guestCart'

class GuestCart extends React.Component {
  render() {
    let price = this.props.guestCart.reduce((sum, itemInCart) => {
      return sum + itemInCart.price * itemInCart.quantity
    }, 0)
    return (
      <div>
        <h1>Welcome to Your Cart!</h1>
        {this.props.guestCart.map(item => {
          return (
            <div key={item.id}>
              <p>Name: {item.name}</p>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <form
                onSubmit={e => {
                  e.preventDefault()
                  let match = false
                  let index = 0
                  for (let i = 0; i < this.props.guestCart.length; ++i) {
                    if (item.id === this.props.guestCart[i].id) {
                      match = true
                      index = i
                    }
                  }
                  if (match) {
                    this.props.addToItem(index, e.target.quantity.value)
                  } else {
                    this.props.addItemGuest(item, e.target.quantity.value)
                  }
                  e.target.quantity.value = ''
                }}
              >
                <div>
                  <label htmlFor="quantity">
                    <small>Quantity</small>
                  </label>
                  <input name="quantity" type="number" min="0" />
                </div>
                <button type="submit">ADD QUANTITY</button>
              </form>
              <button
                type="submit"
                onClick={() => {
                  let index = 0
                  for (let i = 0; i < this.props.guestCart.length; ++i) {
                    if (item.id === this.props.guestCart[i].id) {
                      index = i
                    }
                  }
                  this.props.removeItem(index)
                }}
              >
                DELETE
              </button>
            </div>
          )
        })}
        <h2>
          Total Price: $
          {price.toFixed(2)}
        </h2>
      </div>
    )
  }
}

const mapState = state => ({
  guestCart: state.guestCart
})

const mapDispatch = dispatch => ({
  addItemGuest: (item, quantity) => {
    dispatch(addItem(item, quantity))
  },
  addToItem: (index, quantity) => {
    dispatch(addToItem(index, quantity))
  },
  removeItem: index => {
    dispatch(removeItem(index))
  }
})

export default connect(mapState, mapDispatch)(GuestCart)
