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
    this.props.getCart(this.props.user.cart)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }
  handleSubmit(event) {
    try {
      event.preventDefault()
      this.props.createNewShippingInfo(this.state, this.props.user.id)
      this.props.getShippingInfo(this.state)
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
        <h1>CHECKOUT</h1>

        <h3>Shipping Address</h3>
        <form onSubmit={this.handleSubmit}>
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

          <button type="submit">SAVE SHIPPING INFO</button>
          <Link to="/checkoutBilling">
            <button type="submit">MOVE ON TO PAYMENT</button>
          </Link>
        </form>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
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
