import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {expect} from 'chai'

import {DisconnectedUserProfile} from './user-profile'

Enzyme.configure({adapter: new Adapter()})

describe('UserProfile', () => {
  let wrapper

  const testUser = {
    id: 1,
    email: 'John@email.com',
    role: 'user',
    createdAt: '2020-09-24 15:32:45.493-04'
  }

  beforeEach(() => {
    wrapper = shallow(<DisconnectedUserProfile {...testUser} />)
  })

  it('renders user data passed in as props', () => {
    expect(wrapper.find('.user-profile').text()).include('John')
  })

  it('testing mount', () => {
    // const mounted = mount(<disconnectedUserProfile user={testUser} />)
    // expect(mounted).to.include.text('John@email.com')
  })
})
