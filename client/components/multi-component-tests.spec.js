//loads global document and enables calling mount()
import 'jsdom-global/register'
import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {render, fireEvent, cleanup} from '@testing-library/react'

//getting functions used in this component; better way?
import {fetchItems} from '../store'
import {me as getUser} from '../store/user'

const adapter = new Adapter()
enzyme.configure({adapter})

import {
  AllProductsConnected,
  SingleProductConnected,
  Login,
  Signup,
  UserHome,
  UserProfile,
  Cart
} from './index'
import {AllProducts} from './all-products'

describe('AllProducts', () => {
  let allProducts

  let items = [
    {
      id: 1,
      price: 1,
      quantity: 1
    },
    {
      id: 2,
      price: 2,
      quantity: 2
    },
    {
      id: 3,
      price: 3,
      quantity: 3
    },
    {
      id: 4,
      price: 4,
      quantity: 4
    }
  ]

  beforeEach(() => {
    allProducts = shallow(
      <AllProducts items={items} fetchItems={fetchItems} getUser={getUser} />
    )
  })

  //needed to add classnames to wrapper divs
  it('renders all products', () => {
    expect(allProducts.find('.all-products').text()).to.include(
      '1' && '2' && '3' && '4'
    )
  })

  it('filters products by category', () => {})

  it('puts producst in order by price and rating', () => {})

  it('renders prices correctly', () => {
    expect(allProducts.find('.all-products').text()).to.include('$1.00')
  })
})
