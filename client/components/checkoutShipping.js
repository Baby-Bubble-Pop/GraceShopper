import React from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {createNewShippingInfo} from '../store/checkout'
import {getShippingInfo, getCart} from '../store/order'
import {Link} from 'react-router-dom'

class CheckoutShipping extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      streetAddressLine1: '',
      streetAddressLine2: '',
      aptSuiteNo: '',
      city: '',
      state: '',
      zipCode: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.props.getCart(this.props.user.cart)
    } else {
      this.props.getCart(this.props.guestCart)
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }
  handleSubmit(event) {
    try {
      event.preventDefault()
      if (this.props.user.id) {
        this.props.createNewShippingInfo(this.state, this.props.user.id)
      }
      this.props.getShippingInfo(this.state)
      this.props.history.push('/checkoutBilling') // move onto next checkout form
    } catch (error) {
      console.error('Something went wrong with saving your shipping info!')
    }
  }

  render() {
    // console.log(this.props)
    const {
      streetAddressLine1,
      streetAddressLine2,
      aptSuiteNo,
      city,
      state,
      zipCode
    } = this.state
    return (
      <div>
        <h1 id="pageHeaders">CHECKOUT</h1>

        <h3 id="checkout">Shipping Address</h3>
        <form id="checkout" onSubmit={this.handleSubmit}>
          <label id="checkout" htmlFor="streetAddressLine1">
            Address Line 1
          </label>
          <input
            id="checkout"
            type="text"
            name="streetAddressLine1"
            value={streetAddressLine1}
            onChange={this.handleChange}
          />

          <label id="checkout" htmlFor="streetAddressLine2">
            Address Line 2
          </label>
          <input
            id="checkout"
            type="text"
            name="streetAddressLine2"
            value={streetAddressLine2}
            onChange={this.handleChange}
          />

          <label id="checkout" htmlFor="aptSuiteNo">
            Apt/Suite No
          </label>
          <input
            id="checkout"
            type="text"
            name="aptSuiteNo"
            value={aptSuiteNo}
            onChange={this.handleChange}
          />

          <label id="checkout" htmlFor="city">
            City
          </label>
          <input
            id="checkout"
            type="text"
            name="city"
            value={city}
            onChange={this.handleChange}
          />

          <label id="checkout" htmlFor="state">
            State
          </label>
          <input
            id="checkout"
            type="text"
            name="state"
            value={state}
            onChange={this.handleChange}
          />

          <label id="checkout" htmlFor="zipCode">
            Zip Code
          </label>
          <input
            id="checkout"
            type="text"
            name="zipCode"
            value={zipCode}
            onChange={this.handleChange}
          />

          <button className="submitCheckout" type="submit">
            MOVE ON TO PAYMENT
          </button>
        </form>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  guestCart: state.guestCart,
  shippingInfo: state.shippingInfo
})

const mapDispatch = dispatch => ({
  getUser() {
    dispatch(me())
  },
  createNewShippingInfo(shippingInfo, userId) {
    dispatch(createNewShippingInfo(shippingInfo, userId))
  },
  getShippingInfo(shippingInfo) {
    dispatch(getShippingInfo(shippingInfo))
  },
  getCart(cart) {
    dispatch(getCart(cart))
  }
})

export const CheckedOutShipping = connect(mapState, mapDispatch)(
  CheckoutShipping
)
