import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

export const disconnectedUserProfile = props => {
  const {id, paymentInformation, createdAt, email} = props
  return (
    <div>
      <h3>User Information:</h3>
      <div className="profile">
        <p>Member since: {createdAt.substr(0, 4)}</p>
        <p>Member Id: {id}</p>
        <p>Email address: {email}</p>
        <p>Payment Information: {paymentInformation}</p>
        <p>Purchase history: </p>
        <button
          type="button"
          onClick={() => props.history.push('/profile/edit')}
        >
          Update Profile
        </button>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    createdAt: state.user.createdAt,
    id: state.user.id,
    email: state.user.email,
    paymentInformation: state.user.paymentInformation,
    billingAddress: state.user.billingAddress,
    purchaseHistory: state.user.purchaseHistory
  }
}

export const UserProfile = connect(mapState)(disconnectedUserProfile)

UserProfile.propTypes = {
  cart: PropTypes.array,
  id: PropTypes.number,
  role: PropTypes.string,
  purchaseHistory: PropTypes.array
}

// role: state.user.role,
// purchaseHistory: state.user.purchaseHistory,
