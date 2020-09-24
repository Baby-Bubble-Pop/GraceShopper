import React from 'react'
import {connect} from 'react-redux'
import {fetchItems} from '../store'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchItems()
  }

  render() {
    console.log('WHAT PROPS DO WE HAVE', this.props)

    return (
      <div>
        <h1>All GRACESHOPPER PRODUCTS</h1>

        {this.props.items.map(item => {
          return (
            <div key={item.id}>
              <img src={item.image} />
              <p>{item.name}</p>
              <p>{item.price}</p>
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

export const Test = connect(mapState, mapDispatch)(AllProducts)
