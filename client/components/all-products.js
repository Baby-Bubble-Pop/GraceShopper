import React from 'react'
import {connect} from 'react-redux'
import {fetchItems} from '../store'
import {Link} from 'react-router-dom'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchItems()
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
              <button onClick={this.addToCart}>ADD TO CART</button>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => ({
  items: state.items
})

const mapDispatch = dispatch => {
  return {
    fetchItems() {
      dispatch(fetchItems())
    }
  }
}

export const AllProductsConnected = connect(mapState, mapDispatch)(AllProducts)
