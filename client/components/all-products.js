import React from 'react'
import {connect} from 'react-redux'
import {fetchItems} from '../store'
import {Link} from 'react-router-dom'
import {addToCart, me} from '../store/user'
import {addItem, addToItem} from '../store/guestCart'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchItems()
    this.props.getUser()
  }

  addToCart() {}

  render() {
    return (
      <div className="all-products">
        <h1>All GRACESHOPPER PRODUCTS</h1>

        {this.props.items.map(item => {
          return (
            <div key={item.id}>
              <Link to={`/products/${item.id}`}>
                <img src={item.image} />
                <p>name: {item.name}</p>
              </Link>
              <p>price: ${item.price}</p>
              <p>quantity: {item.quantity}</p>
              <form
                onSubmit={e => {
                  e.preventDefault()
                  if (this.props.user.id) {
                    this.props.addToCart(
                      this.props.user.id,
                      item.id,
                      e.target.quantity.value
                    )
                    this.props.getUser()
                  } else {
                    let match = false
                    let index = 0
                    for (let i = 0; i < this.props.guestCart.length; ++i) {
                      if (item.id === this.props.guestCart[i].id) {
                        match = true
                        index = i
                      }
                    }
                    if (match) {
                      this.props.addToItem(index, e.target.quantity.value)
                    } else {
                      this.props.addItemGuest(item, e.target.quantity.value)
                    }
                  }
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
                    max={item.quantity}
                  />
                </div>
                <button type="submit">ADD TO CART</button>
              </form>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => ({
  items: state.items,
  user: state.user,
  guestCart: state.guestCart
})

const mapDispatch = dispatch => {
  return {
    fetchItems() {
      dispatch(fetchItems())
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
    addToItem(index, quantity) {
      dispatch(addToItem(index, quantity))
    }
  }
}

export const AllProductsConnected = connect(mapState, mapDispatch)(AllProducts)
