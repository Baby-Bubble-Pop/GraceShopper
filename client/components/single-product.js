import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleItem} from '../store/singleItem'

export class SingleProduct extends React.Component {
  componentDidMount() {
    const itemId = this.props.match.params(itemId)
    this.props.fetchSingleItem(itemId)
  }

  render() {
    return (
      <div>
        <h3>Name: {item.name}</h3>
        <h4>Price: {item.price}</h4>
        <div>{item.rating}</div>
        <p>{item.description}</p>
        <p>{item.quantity}</p>
      </div>
    )
  }
}

const mapState = state => ({
  item: state.item
})

const mapDispatch = dispatch => {
  return {
    fetchSingleItem() {
      dispatch(fetchSingleItem(itemId))
    }
  }
}

export const SingleProductConnected = connect(mapState, mapDispatch)(
  SingleProduct
)
