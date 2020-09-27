import React from 'react'
import {connect} from 'react-redux'
import {edit} from '../store/user'

export class disconnectedEditProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: this.props.user.email
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }
  handleSubmit(event) {
    event.preventDefault()
    const user = this.props.user
    user.email = this.state.email
    console.log(user)
    this.props.edit(user)
    console.log('Submitted!')
  }

  render() {
    return (
      <div>
        <h3>Edit Profile Information</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}
const mapDispatch = dispatch => {
  return {
    edit(updatedUser) {
      dispatch(edit(updatedUser))
    }
  }
}

export const EditProfile = connect(mapState, mapDispatch)(
  disconnectedEditProfile
)
