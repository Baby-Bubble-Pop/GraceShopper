// /* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Item = db.model('item')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/items/', () => {
    beforeEach(() => {
      return Item.create({
        price: 3,
        id: 101,
        name: 'pizza rolls'
      })
    })

    it('GET /api/items', async () => {
      const res = await request(app)
        .get('/api/items')
        .expect(200)

      expect(res.body).to.be.an('array')
      console.log('RES.BODY \n\n\n\n\n\n\n\n', res.body)
      expect(res.body[1].name).to.be.equal('pizza rolls')
    })

    // it('GET /api/items/:id', async () => {
    //     const res = await request(app)
    //       .get('/api/items/101')
    //       .expect(200)

    //     expect(res.body).to.be.an('object')
    //     expect(res.body.name).to.be.equal('pizza rolls')
    // })
  })
})
