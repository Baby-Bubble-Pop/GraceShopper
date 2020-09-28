import React from 'react'
import {connect} from 'react-redux'
import {submitOrder} from '../store/order'

class CheckoutConfirm extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    try {
      event.preventDefault()
      this.props.submitOrder(this.props.order)
    } catch (error) {
      console.error('Something went wrong with saving your billing info!')
    }
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h1>CHECKOUT</h1>
        <h3>Total Price: ${this.props.order.cart.totalPrice}</h3>
        {this.props.order.cart.products.map(product => {
          return (
            <div>
              <p>Name: {product.name}</p>
              <p>Price: {product.price}</p>
              <p>Quantity: {product.quantity}</p>
            </div>
          )
        })}

        <hr />

        <h3>Shipping Address</h3>
        <p>
          Address Line 1: {this.props.order.shippingInfo.streetAddressLine1}
        </p>
        <p>Address Line 2:{this.props.order.shippingInfo.streetAddressLine2}</p>
        <p>Apt/Suite No: {this.props.order.shippingInfo.aptSuiteNo}</p>
        <p>City: {this.props.order.shippingInfo.city}</p>
        <p>State: {this.props.order.shippingInfo.state}</p>
        <p>Zip Code:{this.props.order.shippingInfo.zipCode}</p>

        <hr />
        <h3>Billing Info</h3>
        <p>Name: {this.props.order.billingInfo.name}</p>
        <p>
          Credit Card Number:{' '}
          {this.props.order.billingInfo.creditCardNumber % 10000}
        </p>
        <p>CVV: {this.props.order.billingInfo.cvv}</p>
        <p>Expiration Date: {this.props.order.billingInfo.expirationDate}</p>

        <button type="submit">PLACE ORDER</button>
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
  }
})

export const CheckedOutConfirmed = connect(mapState, mapDispatch)(
  CheckoutConfirm
)
