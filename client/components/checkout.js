import React from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'

class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shippingInfo: {
        streetAddressLine1: '',
        streetAddressLine2: '',
        aptSuiteNo: '',
        city: '',
        state: '',
        zipCode: ''
      },

      billingInfo: {
        name: '',
        creditCardNumber: '',
        cvv: '',
        expirationDate: ''
      }
    }
  }

  render() {
    const {
      streetAddressLine1,
      streetAddressLine2,
      aptSuiteNo,
      city,
      state,
      zipCode
    } = this.state.shippingInfo
    const {name, creditCardNumber, cvv, expirationDate} = this.state.billingInfo
    return (
      <div>
        <h1>CHECKOUT</h1>

        <h3>Shipping Address</h3>
        <form>
          <label htmlFor="streetAddressLine1">Address Line 1</label>
          <input
            type="text"
            name="streetAddressLine1"
            value={streetAddressLine1}
            onChange={this.handleChange}
          />

          <label htmlFor="streetAddressLine2">Address Line 2</label>
          <input
            type="text"
            name="streetAddressLine2"
            value={streetAddressLine2}
            onChange={this.handleChange}
          />

          <label htmlFor="aptSuiteNo">Apt/Suite No</label>
          <input
            type="text"
            name="aptSuiteNo"
            value={aptSuiteNo}
            onChange={this.handleChange}
          />

          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            value={city}
            onChange={this.handleChange}
          />

          <label htmlFor="state">State</label>
          <input
            type="text"
            name="state"
            value={state}
            onChange={this.handleChange}
          />

          <label htmlFor="zipCode">Zip Code</label>
          <input
            type="text"
            name="zipCode"
            value={zipCode}
            onChange={this.handleChange}
          />
        </form>

        <hr />
        <h3>Billing Info</h3>
        <form>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />

          <label htmlFor="creditCardNumber">Credit Card Number</label>
          <input
            type="text"
            name="creditCardNumber"
            value={creditCardNumber}
            onChange={this.handleChange}
          />

          <label htmlFor="cvv">CVV</label>
          <input
            type="text"
            name="cvv"
            value={cvv}
            onChange={this.handleChange}
          />

          <label htmlFor="expirationDate">Expiration Date</label>
          <input
            type="text"
            name="expirationDate"
            value={expirationDate}
            onChange={this.handleChange}
          />
        </form>

        <button type="submit">Submit</button>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  getUser() {
    dispatch(me())
  }
})

export const CheckedOut = connect(mapState, mapDispatch)(Checkout)
