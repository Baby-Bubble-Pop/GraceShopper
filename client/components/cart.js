import React from 'react'
import {connect} from 'react-redux'
import {me, addToCart} from '../store/user'

class Cart extends React.Component {
  render() {
    if (this.props.user.hasOwnProperty('cart')) {
      return (
        <div>
          <h1>Welcome to your cart</h1>
          {this.props.user.cart.data.length !== 0 ? (
            this.props.user.cart.data.map(item => {
              return (
                <div key={item.id}>
                  <div>
                    <img src={item.image} />
                    <p>NAME: {item.name}</p>
                    <p>PRICE: {item.price}</p>
                    <p>RATING: {item.rating}</p>
                    <p>DESCRIPTION: {item.description}</p>
                    <p>QUANTITY: {item.cart.quantity}</p>
                  </div>
                  <form
                    onSubmit={e => {
                      e.preventDefault()
                      this.props.addToCart(
                        this.props.user.id,
                        item.id,
                        e.target.quantity.value
                      )
                      this.props.getUser()
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
                </div>
              )
            })
          ) : (
            <div />
          )}
        </div>
      )
    } else {
      return <h1>Your Cart is Empty</h1>
    }
  }
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  getUser() {
    dispatch(me())
  },
  addToCart(userId, itemId, quantity) {
    dispatch(addToCart(userId, itemId, quantity))
  }
})

export default connect(mapState, mapDispatch)(Cart)
