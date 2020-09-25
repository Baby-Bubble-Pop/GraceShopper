import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleItem} from '../store/singleItem'

export class SingleProduct extends React.Component {
  componentDidMount() {
    const itemId = this.props.match.params.id
    this.props.fetchSingleItem(itemId)
  }

  addToCart() {}

  render() {
    console.log('PROPS', this.props)
    const {name, image, price, rating, description, quantity} = this.props.item
    return (
      <div>
        <h1>Product Name: {name}</h1>
        <img src={image} />
        <button onClick={this.addToCart}>ADD TO CART</button>
        <h4>Price: {price}</h4>
        <div>{rating}</div>
        <p>{description}</p>
        <p>{quantity}</p>
      </div>
    )
  }
}

const mapState = state => ({
  item: state.singleItem
})

const mapDispatch = dispatch => {
  return {
    fetchSingleItem(itemId) {
      dispatch(fetchSingleItem(itemId))
    }
  }
}

export const SingleProductConnected = connect(mapState, mapDispatch)(
  SingleProduct
)
