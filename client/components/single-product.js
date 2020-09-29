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
    const {name, image, price, rating, description, quantity} = this.props.item
    return (
      <div className="single-Product single-Product--2cols">
        <div className="single-Product-single">
          <img src={image} />
        </div>
        <div className="single-Product-single">
          <h1>Product Name: {name}</h1>
          <h4>Price: ${price}.00</h4>
          <div>Rating: {rating}</div>
          <p>Description: {description}Insert description about product here</p>
          <p>Quantity: {quantity}</p>
          <form
            onSubmit={e => {
              e.preventDefault()
              this.props.addToCart(
                this.props.user.id,
                this.props.item.id,
                e.target.quantity.value
              )
              this.props.getUser()
            }}
          >
            <div>
              {/* <label htmlFor="quantity">
                <small>Quantity</small>
              </label> */}
              <input name="quantity" type="number" />
            </div>
            <button type="submit">ADD TO CART</button>
          </form>
        </div>
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
    addToCart(userId, itemId, quantity) {
      dispatch(addToCart(userId, itemId, quantity))
    },
    getUser() {
      dispatch(me())
    }
  }
}

export const SingleProductConnected = connect(mapState, mapDispatch)(
  SingleProduct
)
