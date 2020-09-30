import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchSingleItem} from '../store/singleItem'
import {addToCart, me} from '../store/user'
import {addItem, updateCart} from '../store/guestCart'

export class SingleProduct extends React.Component {
  componentDidMount() {
    const itemId = this.props.match.params.id
    this.props.fetchSingleItem(itemId)
    this.props.getUser()
  }

  render() {
    const {name, image, price, rating, description, quantity} = this.props.item
    return (
      <div>
        <h1>Product Name: {name}</h1>
        <img src={image} />
        <form
          onSubmit={e => {
            e.preventDefault()
            if (this.props.user.id) {
              this.props.addToCart(
                this.props.user.id,
                this.props.item.id,
                e.target.quantity.value
              )
            } else {
              let match = false
              let index = 0
              for (let i = 0; i < this.props.guestCart.length; ++i) {
                if (this.props.item.id === this.props.guestCart[i].id) {
                  match = true
                  index = i
                }
              }
              if (match) {
                this.props.guestCart[index].quantity =
                  Number(this.props.guestCart[index].quantity) +
                  Number(e.target.quantity.value)
                this.props.updateCart(this.props.guestCart)
              } else {
                this.props.addItemGuest(
                  this.props.item,
                  e.target.quantity.value
                )
              }
            }
            this.props.getUser()
            e.target.quantity.value = ''
          }}
        >
          <div>
            <label htmlFor="quantity">
              <small>Quantity</small>
            </label>
            <input
              name="quantity"
              type="number"
              min="1"
              max={this.props.item.quantity}
            />
          </div>
          <button type="submit">ADD TO CART</button>
        </form>

        <p>Price: ${price}</p>
        <div>Rating: {rating}</div>
        <p>Description: {description}</p>
        <p>Quantity: {quantity}</p>
        {this.props.user.role === 'admin' ? (
          <div>
            <Link to="/editProduct">
              <button type="submit">EDIT PRODUCT</button>
            </Link>
          </div>
        ) : (
          <div />
        )}
      </div>
    )
  }
}

const mapState = state => ({
  item: state.singleItem,
  user: state.user,
  guestCart: state.guestCart
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
    },
    addItemGuest(item, quantity) {
      dispatch(addItem(item, quantity))
    },
    updateCart(cart) {
      dispatch(updateCart(cart))
    }
  }
}

export const SingleProductConnected = connect(mapState, mapDispatch)(
  SingleProduct
)
