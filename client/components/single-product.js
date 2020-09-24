import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleItem} from '../store/singleItem'

export class SingleProduct extends React.Component {
  componentDidMount() {
    const itemId = this.props.match.params.id
    this.props.fetchSingleItem(itemId)
  }

  render() {
    console.log('this.props.match.params.id:', this.props.match.params.id)
    console.log('PROPS', this.props)
    return (
      <div>
        <h1>this is a test</h1>
        {/* <h1>Name: {item.name}</h1>
        <h4>Price: {item.price}</h4>
        <div>{item.rating}</div>
        <p>{item.description}</p>
        <p>{item.quantity}</p> */}
      </div>
    )
  }
}

const mapState = state => ({
  item: state.item
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
