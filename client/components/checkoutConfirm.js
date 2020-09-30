import React from 'react'
import {connect} from 'react-redux'
import {clearCart} from '../store'
import {submitOrder} from '../store/order'

class CheckoutConfirm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      completed: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    try {
      event.preventDefault()
      this.props.submitOrder(this.props.order)
      this.props.clearCart(this.props.order.cart.products)
      this.setState({completed: true})
      this.props.history.push('/orderConfirmed')
    } catch (error) {
      console.error('Something went wrong with saving your billing info!')
    }
  }

  render() {
    return (
      <div>
        <h1 id="pageHeaders">CONFIRM ORDER</h1>
        {!this.state.completed ? (
          <h3 id="checkout">CHECKOUT</h3>
        ) : (
          <h3 id="checkout">Order Receipt</h3>
        )}
        <h2 id="totalPriceConfirm">
          Total Price: ${(this.props.order.cart.totalPrice / 10000000).toFixed(
            2
          )}M
        </h2>
        {this.props.order.cart.products.map(product => {
          return (
            <div className="confirm-Table cart-Table--6cols" key={product.id}>
              <div className="cart-Table-single">
                {' '}
                <img src={product.image} />{' '}
              </div>
              <div className="confirm-Table-single">
                <p>{product.name}</p>
              </div>
              <div className="confirm-Table-single">
                <p>${(product.price / 10000000).toFixed(2)}M</p>
              </div>
              <div className="confirm-Table-single">
                <p>Quantity: {product.quantity}</p>
              </div>
            </div>
          )
        })}

        <div className="confirmation">
          <h3 id="confirmation">Shipping Address</h3>
          <p>
            <i>Address Line 1:</i>{' '}
            {this.props.order.shippingInfo.streetAddressLine1}
          </p>
          <p>
            <i>Address Line 2:</i>
            {this.props.order.shippingInfo.streetAddressLine2}
          </p>
          <p>
            <i>Apt/Suite No:</i> {this.props.order.shippingInfo.aptSuiteNo}
          </p>
          <p>
            <i>City:</i> {this.props.order.shippingInfo.city}
          </p>
          <p>
            <i>State:</i> {this.props.order.shippingInfo.state}
          </p>
          <p>
            <i>Zip Code:</i>
            {this.props.order.shippingInfo.zipCode}
          </p>
        </div>

        <div className="confirmation">
          <h3 id="confirmation">Billing Info</h3>
          <p>
            <i>Name:</i> {this.props.order.billingInfo.name}
          </p>
          <p>
            <i>Credit Card Number:</i>{' '}
            {this.props.order.billingInfo.creditCardNumber % 10000}
          </p>
          <p>
            <i>CVV:</i> {this.props.order.billingInfo.cvv}
          </p>
          <p>
            <i>Expiration Date:</i>{' '}
            {this.props.order.billingInfo.expirationDate}
          </p>
        </div>
        {!this.state.completed ? (
          <form onSubmit={this.handleSubmit}>
            <button className="finalSubmit" type="submit">
              PLACE ORDER
            </button>
          </form>
        ) : (
          ''
        )}
      </div>
    )
  }
}

const mapState = state => ({
  order: state.order
})

const mapDispatch = dispatch => ({
  submitOrder(order) {
    dispatch(submitOrder(order))
  },
  clearCart(cart) {
    dispatch(clearCart(cart))
  }
})

export const CheckedOutConfirmed = connect(mapState, mapDispatch)(
  CheckoutConfirm
)
