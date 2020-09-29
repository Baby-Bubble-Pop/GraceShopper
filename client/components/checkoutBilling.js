import React from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {createNewBillingInfo} from '../store/checkout'
import {getBillingInfo} from '../store/order'
import {Link} from 'react-router-dom'

class CheckoutBilling extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      creditCardNumber: '',
      cvv: '',
      expirationDate: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }
  handleSubmit(event) {
    try {
      event.preventDefault()
      this.props.createNewBillingInfo(this.state, this.props.user.id)
      this.props.getBillingInfo(this.state)
    } catch (error) {
      console.error('Something went wrong with saving your billing info!')
    }
  }

  render() {
    const {name, creditCardNumber, cvv, expirationDate} = this.state
    return (
      <div>
        <h1 id="pageHeaders">CHECKOUT</h1>
        <h3 id="checkout">Billing Info</h3>
        <form id="checkout" onSubmit={this.handleSubmit}>
          <label id="checkout" htmlFor="name">
            Name
          </label>
          <input
            id="checkout"
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />

          <label id="checkout" htmlFor="creditCardNumber">
            Credit Card Number
          </label>
          <input
            id="checkout"
            type="text"
            name="creditCardNumber"
            value={creditCardNumber}
            onChange={this.handleChange}
          />

          <label id="checkout" htmlFor="cvv">
            CVV
          </label>
          <input
            id="checkout"
            type="text"
            name="cvv"
            value={cvv}
            onChange={this.handleChange}
          />

          <label id="checkout" htmlFor="expirationDate">
            Expiration Date
          </label>
          <input
            id="checkout"
            type="text"
            name="expirationDate"
            value={expirationDate}
            onChange={this.handleChange}
          />
          <div className="checkoutContainer">
            <button className="submitCheckout" type="submit">
              SAVE BILLING INFO
            </button>
            <Link to="/checkoutConfirm">
              <button className="submitCheckout" type="submit">
                CONFIRM ORDER
              </button>
            </Link>
          </div>
        </form>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  billingInfo: state.billingInfo
})

const mapDispatch = dispatch => ({
  getUser() {
    dispatch(me())
  },
  createNewBillingInfo(billingInfo, userId) {
    dispatch(createNewBillingInfo(billingInfo, userId))
  },
  getBillingInfo(billingInfo) {
    dispatch(getBillingInfo(billingInfo))
  }
})

export const CheckedOutBilling = connect(mapState, mapDispatch)(CheckoutBilling)
