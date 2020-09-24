import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleItem} from '../store/singleItem'

export class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.fetchSingleItem()
  }

  render() {
    return <div />
  }
}

const mapState = state => ({
  item: state.item
})

const mapDispatch = dispatch => {
  return {
    fetchSingleItem() {
      dispatch(fetchSingleItem())
    }
  }
}

export const SingleProductConnected = connect(mapState, mapDispatch)(
  SingleProduct
)
