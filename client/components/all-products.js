import React from 'react'
import {connect} from 'react-redux'
import {fetchItems} from '../store'
import {Link} from 'react-router-dom'
import {addToCart, me} from '../store/user'
import {addItem, updateCart} from '../store/guestCart'

export class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: this.props.items
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchItems()
    this.props.getUser()
  }

  handleChange(e) {
    e.preventDefault()
    let filteredItems = this.props.items.filter(item => {
      return item.category === e.target.value
    })
    if (e.target.value !== 'all') {
      this.setState({
        items: filteredItems
      })
    } else {
      this.setState({
        items: this.props.items
      })
    }
  }

  render() {
    let stateItems = this.state.items
    let propsItems = this.props.items
    return (
      <div>
        <h1 id="pageHeaders">ALL FULLSTACK YACHTS</h1>
        <select
          name="category"
          id="addProduct"
          onChange={this.handleChange}
          value={this.state.items}
        >
          <option value="all">All</option>
          <option value="big">Big</option>
          <option value="huge">Huge</option>
          <option value="mega">Mega</option>
        </select>
        <div className="all-product-container">
          {stateItems.map(item => {
            return (
              <div className="product-list" key={item.id}>
                <Link to={`/products/${item.id}`}>
                  <img id="allProducts" src={item.image} />
                </Link>
                <div className="product-info">
                  <p>{item.name}</p>
                  <p id="price">${(item.price / 10000000).toFixed(2)}M</p>
                  <p>Type: {item.category}</p>
                  <form
                    onSubmit={e => {
                      e.preventDefault()
                      if (this.props.user.id) {
                        this.props.addToCart(
                          this.props.user.id,
                          item.id,
                          e.target.quantity.value
                        )
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
                          this.props.guestCart[index].quantity =
                            Number(this.props.guestCart[index].quantity) +
                            Number(e.target.quantity.value)
                          this.props.updateCart(this.props.guestCart)
                        } else {
                          this.props.addItemGuest(item, e.target.quantity.value)
                        }
                      }
                      this.props.getUser()
                      e.target.quantity.value = ''
                    }}
                  >
                    <div>
                      <input
                        name="quantity"
                        type="number"
                        min="1"
                        max={item.quantity}
                      />
                    </div>
                    <button className="addToCart" type="submit">
                      ADD TO CART
                    </button>
                  </form>
                </div>
              </div>
            )
          })}
        </div>
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
    updateCart(cart) {
      dispatch(updateCart(cart))
    }
  }
}

export const AllProductsConnected = connect(mapState, mapDispatch)(AllProducts)
