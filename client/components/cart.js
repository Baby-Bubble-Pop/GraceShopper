import React from 'react'
import {connect} from 'react-redux'
import {fetchUser} from '../store/user'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: []
    }
  }
  // componentDidMount() {
  //   this.props.getUser()
  //   this.setState({
  //     cart: this.props.user.cart.data
  //   })
  // }
  render() {
    console.log(this.props)
    let cart = this.props.user.cart.data
    console.log(cart)
    return (
      <div>
        <h1>Welcome to your cart</h1>
        {cart ? (
          cart.map(item => {
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
  }
}

const mapState = state => ({
  user: state.user
})

// const mapDispatch = dispatch => ({
//   getUser: () => dispatch(fetchUser())
// })

export default connect(mapState)(Cart)
