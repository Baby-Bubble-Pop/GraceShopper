import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleItem} from '../store/singleItem'
import {addToCart, me} from '../store/user'

export class SingleProduct extends React.Component {
  componentDidMount() {
    const itemId = this.props.match.params.id
    this.props.fetchSingleItem(itemId)
    this.props.getUser()
  }

  render() {
    console.log('PROPS', this.props)
    const {name, image, price, rating, description, quantity} = this.props.item
    return (
      <div>
        <h1>Product Name: {name}</h1>
        <img src={image} />
        <button
          onClick={() => {
            this.props.addToCart(this.props.user.id, this.props.item.id)
            this.props.getUser()
          }}
        >
          ADD TO CART
        </button>

        <h4>Price: {price}</h4>
        <div>{rating}</div>
        <p>{description}</p>
        <p>{quantity}</p>
      </div>
    )
  }
}

const mapState = state => ({
  item: state.singleItem,
  user: state.user
})

const mapDispatch = dispatch => {
  return {
    fetchSingleItem(itemId) {
      dispatch(fetchSingleItem(itemId))
    },
    addToCart(userId, itemId) {
      dispatch(addToCart(userId, itemId))
    },
    getUser() {
      dispatch(me())
    }
  }
}

export const SingleProductConnected = connect(mapState, mapDispatch)(
  SingleProduct
)
