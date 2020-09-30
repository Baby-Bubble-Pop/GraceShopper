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
        <form id="addProduct" onSubmit={this.handleSubmit}>
          <h3 id="addProduct">Add New Product</h3>
          <div>
            <label id="addProduct" htmlFor="name">
              <small>Name</small>
            </label>
            <input id="addProduct" name="name" type="text" required />
          </div>
          <div>
            <label id="addProduct" htmlFor="description">
              <small>Description</small>
            </label>
            <input id="addProduct" name="description" type="text" />
          </div>
          <div>
            <label id="addProduct" htmlFor="price">
              <small>Price</small>
            </label>
            <input id="addProduct" name="price" type="text" required />
          </div>
          <div>
            <label id="addProduct" htmlFor="vat">
              <small>VAT</small>
            </label>
            <input id="addProduct" name="vat" type="text" required />
          </div>
          <div>
            <label id="addProduct" htmlFor="rating">
              <small>Rating</small>
            </label>
            <input
              id="addProduct"
              name="rating"
              type="text"
              min="0"
              max="5"
              required
            />
          </div>
          <div>
            <label id="addProduct" htmlFor="quantity">
              <small>Quantity</small>
            </label>
            <input id="addProduct" name="quantity" type="text" required />
          </div>
          <div>
            <label id="addProduct" htmlFor="grossTonnage">
              <small>Gross Registered Tonnage</small>
            </label>
            <input id="addProduct" name="grossTonnage" type="text" required />
          </div>
          <div>
            <label id="addProduct" htmlFor="guests">
              <small>Guests</small>
            </label>
            <input id="addProduct" name="guests" type="text" required />
          </div>
          <div>
            <label id="addProduct" htmlFor="beam">
              <small>Beam</small>
            </label>
            <input id="addProduct" name="beam" type="text" required />
          </div>
          <div>
            <label id="addProduct" htmlFor="draft">
              <small>Draft</small>
            </label>
            <input id="addProduct" name="draft" type="text" required />
          </div>
          <div>
            <label id="addProduct" htmlFor="length">
              <small>Length</small>
            </label>
            <input id="addProduct" name="length" type="text" required />
          </div>
          <div>
            <label id="addProduct" htmlFor="image">
              <small>Image URL</small>
            </label>
            <input id="addProduct" name="image" type="text" />
          </div>
          <div>
            <label id="addProduct" htmlFor="category">
              <small>Category</small>
            </label>
            <select id="addProduct" name="category">
              <option>Big</option>
              <option>Huge</option>
              <option>Mega</option>
            </select>
          </div>
          <button className="submitCheckout" type="submit">
            SUBMIT
          </button>
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
