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
    console.log('ALL PRODUCTS PROPS', this.props)
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
              <button
                onClick={() => {
                  this.props.addToCart(this.props.user.id, item.id)
                  this.props.getUser()
                }}
              >
                ADD TO CART
              </button>
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
    addToCart(userId, itemId) {
      dispatch(addToCart(userId, itemId))
    },
    getUser() {
      dispatch(me())
    }
  }
}

export const AllProductsConnected = connect(mapState, mapDispatch)(AllProducts)
