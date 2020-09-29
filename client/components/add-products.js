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
    console.log(e.target.category.value)
    let itemBody = {
      name: e.target.name.value,
      description: e.target.description.value,
      price: Number(e.target.price.value),
      VAT: e.target.vat.value,
      rating: e.target.rating.value,
      quantity: e.target.quantity.value,
      grossRegisteredTonnage: e.target.grossTonnage.value,
      guests: e.target.guests.value,
      beam: e.target.beam.value,
      draft: e.target.draft.value,
      length: e.target.length.value,
      image: e.target.image.value,
      category: e.target.category.value.toLowerCase()
    }
    this.props.createItem(itemBody)
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
            <input name="vat" type="text" required />
          </div>
          <div>
            <label htmlFor="rating">
              <small>Rating</small>
            </label>
            <input name="rating" type="text" min="0" max="5" required />
          </div>
          <div>
            <label htmlFor="quantity">
              <small>Quantity</small>
            </label>
            <input name="quantity" type="text" required />
          </div>
          <div>
            <label htmlFor="grossTonnage">
              <small>Gross Registered Tonnage</small>
            </label>
            <input name="grossTonnage" type="text" required />
          </div>
          <div>
            <label htmlFor="guests">
              <small>Guests</small>
            </label>
            <input name="guests" type="text" required />
          </div>
          <div>
            <label htmlFor="beam">
              <small>Beam</small>
            </label>
            <input name="beam" type="text" required />
          </div>
          <div>
            <label htmlFor="draft">
              <small>Draft</small>
            </label>
            <input name="draft" type="text" required />
          </div>
          <div>
            <label htmlFor="length">
              <small>Length</small>
            </label>
            <input name="length" type="text" required />
          </div>
          <div>
            <label htmlFor="image">
              <small>Image URL</small>
            </label>
            <input name="image" type="text" />
          </div>
          <div>
            <label htmlFor="category">
              <small>Category</small>
            </label>
            <select name="category">
              <option>Big</option>
              <option>Huge</option>
              <option>Mega</option>
            </select>
          </div>
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    createItem(item) {
      dispatch(createItem(item))
    }
  }
}

export default connect(null, mapDispatch)(AddProduct)
