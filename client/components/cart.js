import React from 'react'
import {connect} from 'react-redux'

class Cart extends React.Component {
  render() {
    if (this.props.user.hasOwnProperty('cart')) {
      return (
        <div>
          <h1>Welcome to your cart</h1>
          {this.props.user.cart.data.length !== 0 ? (
            this.props.user.cart.data.map(item => {
              return (
                <div key={item.id}>
                  <p>NAME: {item.name}</p>
                  <p>PRICE: {item.price}</p>
                  <p>RATING: {item.rating}</p>
                  <p>DESCRIPTION: {item.description}</p>
                  <p>IMAGE: {item.image}</p>
                </div>
              )
            })
          ) : (
            <div />
          )}
        </div>
      )
    } else {
      return <h1>Not Found</h1>
    }
  }
}

const mapState = state => ({
  user: state.user
})

export default connect(mapState)(Cart)
