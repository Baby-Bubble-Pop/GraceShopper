import React from 'react'
import {connect} from 'react-redux'
import {updateCart} from '../store/guestCart'
import {Link} from 'react-router-dom'

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
        <h1 id="pageHeaders">Welcome to Your Cart!</h1>
        <Link to="/checkoutShipping">
          <button className="checkout" type="submit">
            CHECKOUT
          </button>
        </Link>
        {this.props.guestCart.map(item => {
          return (
            <div className="cart-Table cart-Table--6cols" key={item.id}>
              <div className="cart-Table-single">
                <img src={item.image} />
              </div>
              <div className="cart-Table-single">
                <p>{item.name}</p>
              </div>
              <div className="cart-Table-single">
                <p>${(item.price / 10000000).toFixed(2)}M</p>
              </div>
              <div className="cart-Table-single">
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className="cart-Table-single">
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
                    <input name="quantity" type="number" min="0" />
                  </div>
                  <button className="addQuant" type="submit">
                    EDIT QUANTITY
                  </button>
                </form>
              </div>
              <div className="cart-Table-single">
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
            </div>
          )
        })}
        <h2 id="totalPrice">
          Total Price: ${(totalPrice / 10000000).toFixed(2)}M
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
