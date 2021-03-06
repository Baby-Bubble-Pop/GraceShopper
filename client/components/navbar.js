import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, role}) => (
  <div>
    <nav>
      <h1 id="navbar">FULLSTACK YACHT CLUB</h1>
      {isLoggedIn ? (
        role === 'admin' ? (
          <nav className="links">
            {/* The navbar will show these links after you log in and are an admin */}
            <Link to="/home">Home</Link>
            <Link to="/products">All Products</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/profile">My Profile</Link>
            <Link to="/addProduct">Add Product</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </nav>
        ) : (
          <nav className="links">
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/products">All Products</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/profile">My Profile</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </nav>
        )
      ) : (
        <nav className="links">
          {/* The navbar will show these links before you log in */}
          <Link to="/products">All Products</Link>
          <Link to="/guestcart">Cart</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </nav>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    role: state.user.role
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
