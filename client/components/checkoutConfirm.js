import React from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {getShippingInfo} from '../store/checkout'

class CheckoutConfirm extends React.Component {
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

  componentDidMount() {
    this.props.getShippingInfo(this.props.user.id)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }
  handleSubmit(event) {
    try {
      event.preventDefault()
      this.props.createNewBillingInfo(this.state)
    } catch (error) {
      console.error('Something went wrong with saving your billing info!')
    }
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h1>CHECKOUT</h1>
        <h3>Shipping</h3>

        <button type="submit">PLACE ORDER</button>
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
  getShippingInfo(userId) {
    dispatch(getShippingInfo(userId))
  }
})

export const CheckedOutConfirmed = connect(mapState, mapDispatch)(
  CheckoutConfirm
)
