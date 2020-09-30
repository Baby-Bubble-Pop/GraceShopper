import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleItem, editSingleItem} from '../store/singleItem'

class EditProduct extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    const itemId = this.props.match.params.id
    this.props.fetchSingleItem(itemId)
    this.setState(this.props.item)
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.editSingleItem(this.state)
  }
  handleChange(e) {
    if (e.target.name === 'category') {
      this.setState({
        [e.target.name]: e.target.value.toLowerCase()
      })
    } else {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }
  render() {
    return (
      <div>
        <h1>Edit</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">
              <small>Name</small>
            </label>
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description">
              <small>Description</small>
            </label>
            <input
              name="description"
              type="text"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="price">
              <small>Price</small>
            </label>
            <input
              name="price"
              type="text"
              value={this.state.price}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="vat">
              <small>VAT</small>
            </label>
            <input
              name="vat"
              type="text"
              value={this.state.VAT}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="rating">
              <small>Rating</small>
            </label>
            <input
              name="rating"
              type="text"
              min="0"
              max="5"
              value={this.state.rating}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="quantity">
              <small>Quantity</small>
            </label>
            <input
              name="quantity"
              type="text"
              value={this.state.quantity}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="grossTonnage">
              <small>Gross Registered Tonnage</small>
            </label>
            <input
              name="grossTonnage"
              type="text"
              value={this.state.grossRegisteredTonnage}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="guests">
              <small>Guests</small>
            </label>
            <input
              name="guests"
              type="text"
              value={this.state.guests}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="beam">
              <small>Beam</small>
            </label>
            <input
              name="beam"
              type="text"
              value={this.state.beam}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="draft">
              <small>Draft</small>
            </label>
            <input
              name="draft"
              type="text"
              value={this.state.draft}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="length">
              <small>Length</small>
            </label>
            <input
              name="length"
              type="text"
              value={this.state.length}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="image">
              <small>Image URL</small>
            </label>
            <input
              name="image"
              type="text"
              value={this.state.image}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="category">
              <small>Category</small>
            </label>
            <select name="category" onChange={this.handleChange}>
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

const mapState = state => ({
  item: state.singleItem
})

const mapDispatch = dispatch => {
  return {
    fetchSingleItem(itemId) {
      dispatch(fetchSingleItem(itemId))
    },
    editSingleItem(item) {
      dispatch(editSingleItem(item))
    }
  }
}

export default connect(mapState, mapDispatch)(EditProduct)
