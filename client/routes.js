import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  AllProductsConnected,
  SingleProductConnected,
  Login,
  Signup,
  UserHome,
  UserProfile,
  Cart,
  GuestCart,
  EditProfile,
  CheckedOutShipping,
  CheckedOutBilling,
  CheckedOutConfirmed,
  AddProduct,
  OrderConfirmed
} from './components'

import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/products" component={AllProductsConnected} />
        <Route exact path="/products/:id" component={SingleProductConnected} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/guestcart" component={GuestCart} />
        <Route path="/checkoutShipping" component={CheckedOutShipping} />
        <Route path="/checkoutBilling" component={CheckedOutBilling} />
        <Route path="/checkoutConfirm" component={CheckedOutConfirmed} />
        <Route path="/orderConfirmed" component={OrderConfirmed} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route path="/cart" component={Cart} />
            <Route exact path="/profile" component={UserProfile} />
            <Route exact path="/profile/edit" component={EditProfile} />
            <Route path="/addProduct" component={AddProduct} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    customerId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
