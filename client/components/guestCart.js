import React from 'react'
import {connect} from 'react-redux'
import {updateCart} from '../store/guestCart'

class GuestCart extends React.Component {
  constructor() {
    super()
    this.state = {
      rerender: null
    }
  }
  render() {
    console.log('RENDERING')
    let totalPrice = this.props.guestCart.reduce((sum, itemInCart) => {
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
                  for (let i = 0; i < this.props.guestCart.length; ++i) {
                    if (item.id === this.props.guestCart[i].id) {
                      this.props.guestCart[i].quantity =
                        Number(this.props.guestCart[i].quantity) +
                        Number(e.target.quantity.value)
                      this.props.updateCart(this.props.guestCart)
                    }
                  }
                  this.setState({rerender: null})
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
                  let cart = this.props.guestCart
                  cart.splice(index, 1)
                  this.props.updateCart(cart)
                  this.setState({rerender: null})
                }}
              >
                DELETE
              </button>
            </div>
          )
        })}
        <h2>
          Total Price: $
          {totalPrice.toFixed(2)}
        </h2>
      </div>
    )
  }
}

const mapState = state => ({
  guestCart: state.guestCart
})

const mapDispatch = dispatch => ({
  updateCart: cart => {
    dispatch(updateCart(cart))
  }
})

export default connect(mapState, mapDispatch)(GuestCart)
