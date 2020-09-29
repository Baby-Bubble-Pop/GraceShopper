import React from 'react'
import {connect} from 'react-redux'
import {createItem} from '../store/items'

class AddProduct extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault()
    let itemBody = {
      name: e.target.name.value,
      description: e.target.description.value,
      price: e.target.name.price,
      VAT: e.target.name.vat,
      rating: e.target.name.rating,
      quantity: e.target.name.quantity,
      grossRegisteredTonnage: e.target.name.grossTonnage,
      guests: e.target.name.guests,
      beam: e.target.name.beam,
      draft: e.target.name.draft,
      length: e.target.name.length,
      image: e.target.name.image
    }
    this.props.addItem(itemBody)
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">
              <small>Name</small>
            </label>
            <input name="name" type="text" required />
          </div>
          <div>
            <label htmlFor="description">
              <small>Description</small>
            </label>
            <input name="description" type="text" />
          </div>
          <div>
            <label htmlFor="price">
              <small>Price</small>
            </label>
            <input name="price" type="text" required />
          </div>
          <div>
            <label htmlFor="vat">
              <small>VAT</small>
            </label>
            <input name="vat" type="text" />
          </div>
          <div>
            <label htmlFor="rating">
              <small>Rating</small>
            </label>
            <input name="rating" type="text" />
          </div>
          <div>
            <label htmlFor="quantity">
              <small>Quantity</small>
            </label>
            <input name="quantity" type="text" />
          </div>
          <div>
            <label htmlFor="grossTonnage">
              <small>Gross Registered Tonnage</small>
            </label>
            <input name="grossTonnage" type="text" />
          </div>
          <div>
            <label htmlFor="guests">
              <small>Guests</small>
            </label>
            <input name="guests" type="text" />
          </div>
          <div>
            <label htmlFor="beam">
              <small>Beam</small>
            </label>
            <input name="beam" type="text" />
          </div>
          <div>
            <label htmlFor="draft">
              <small>Draft</small>
            </label>
            <input name="draft" type="text" />
          </div>
          <div>
            <label htmlFor="length">
              <small>Length</small>
            </label>
            <input name="length" type="text" />
          </div>
          <div>
            <label htmlFor="image">
              <small>Image URL</small>
            </label>
            <input name="image" type="text" />
          </div>
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    addItem(item) {
      dispatch(createItem(item))
    }
  }
}

export default connect(mapDispatch)(AddProduct)
