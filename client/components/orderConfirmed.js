import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const OrderConfirmed = props => {
  const {email} = props

  return (
    <div className="home-background">
      <div>
        <h3 id="welcome">Your Order Has Been Placed!</h3>
        <p id="welcome">
          Check your email for your order number and further details!
        </p>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(OrderConfirmed)

/**
 * PROP TYPES
 */
OrderConfirmed.propTypes = {
  email: PropTypes.string
}
