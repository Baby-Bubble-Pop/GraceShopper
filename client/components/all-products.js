import React from 'react'
import {connect} from 'react-redux'
import {fetchItems} from '../store'
import {Link} from 'react-router-dom'
import {addToCart, me} from '../store/user'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchItems()
    this.props.getUser()
  }

  addToCart() {}

  render() {
    return (
      <div>
        <h1>All GRACESHOPPER PRODUCTS</h1>

        {this.props.items.map(item => {
          return (
            <div key={item.id}>
              <Link to={`/products/${item.id}`}>
                <img src={item.image} />
                <p>name: {item.name}</p>
              </Link>
              <p>price: {item.price}</p>
              <p>quantity: {item.quantity}</p>
              <form
                onSubmit={e => {
                  e.preventDefault()
                  this.props.addToCart(
                    this.props.user.id,
                    item.id,
                    e.target.quantity.value
                  )
                  this.props.getUser()
                }}
              >
                <div>
                  <label htmlFor="quantity">
                    <small>Quantity</small>
                  </label>
                  <input name="quantity" type="number" />
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
  user: state.user
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
    }
  }
}

export const AllProductsConnected = connect(mapState, mapDispatch)(AllProducts)
