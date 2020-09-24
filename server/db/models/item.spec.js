const {expect} = require('chai')
const db = require('../index')
const Item = db.model('item')

describe('Item model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('model fields', () => {
    describe('price', () => {
      let testItem

      beforeEach(async () => {
        testItem = await Item.create({
          name: 'banana',
          description: 'good source of potassium',
          price: 2.7,
          rating: 4.8,
          quantity: 5
        })
      })

      it('returns price in the correct format', () => {
        expect(testItem.price).to.deep.equal(2.7)
      })

      it('return rating in correct format', () => {
        expect(testItem.rating).to.deep.equal(4.8)
      })
    })
  })
})
