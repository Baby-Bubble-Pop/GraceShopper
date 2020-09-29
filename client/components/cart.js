import React from 'react'
import {connect} from 'react-redux'
import {me, addToCart, deleteFromCart} from '../store/user'
import {Link} from 'react-router-dom'

class Cart extends React.Component {
  render() {
    if (this.props.user.hasOwnProperty('cart')) {
      return (
        <div>
          <h1 id="pageHeaders">Welcome to your cart</h1>
          <Link to="/checkoutShipping">
            <button className="checkout" type="submit">
              CHECKOUT
            </button>
          </Link>
          {this.props.user.cart.length !== 0 ? (
            this.props.user.cart.map(item => {
              return (
                <div className="cart-Table cart-Table--6cols" key={item.id}>
                  <div className="cart-Table-single">
                    <img src={item.image} />
                  </div>
                  <div className="cart-Table-single">
                    <p>NAME: {item.name}</p>
                  </div>
                  <div className="cart-Table-single">
                    <p>PRICE: {item.price}</p>
                  </div>
                  <div className="cart-Table-single">
                    <p>QUANTITY: {item.cart.quantity}</p>
                  </div>

                  <div className="cart-Table-single">
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

                  <div className="cart-Table-single">
                    <button
                      type="submit"
                      onClick={() => {
                        this.props.deleteFromCart(item.id, this.props.user.id)
                      }}
                    >
                      DELETE
                    </button>
                  </div>
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
  },
  deleteFromCart(itemId, userId) {
    dispatch(deleteFromCart(itemId, userId))
  }
})

export default connect(mapState, mapDispatch)(Cart)
