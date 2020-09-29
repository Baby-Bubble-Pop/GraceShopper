//loads global document and enables calling mount()
import 'jsdom-global/register'

import React from 'react'
import Enzyme, {shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {expect} from 'chai'

import {DisconnectedUserProfile} from './user-profile'

Enzyme.configure({adapter: new Adapter()})

describe('UserProfile', () => {
  let wrapper
  let mounted

  const testUser = {
    id: 1,
    email: 'John@email.com',
    role: 'user',
    createdAt: '2020-09-24 15:32:45.493-04'
  }

  beforeEach(() => {
    wrapper = shallow(<DisconnectedUserProfile {...testUser} />)
    mounted = mount(<DisconnectedUserProfile {...testUser} />)
  })

  it('renders user data passed in as props', () => {
    expect(wrapper.find('.user-profile').text()).include('John')
  })

  it('testing mounted component', () => {
    expect(mounted.find('.user-profile').text()).include('John')
  })
})
