import React from 'react'
import {connect} from 'react-redux'
import {addItem, addToItem} from '../store/guestCart'

class GuestCart extends React.Component {
  render() {
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
                }}
              >
                <div>
                  <label htmlFor="quantity">
                    <small>Quantity</small>
                  </label>
                  <input name="quantity" type="number" />
                </div>
                <button type="submit">ADD QUANTITY</button>
              </form>
              {/* <button
                    type="submit"
                    onClick={() => {
                      this.props.deleteFromCart(item.id, this.props.user.id)
                    }}
                  >
                    DELETE
                  </button> */}
            </div>
          )
        })}
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
  }
})

export default connect(mapState, mapDispatch)(GuestCart)
