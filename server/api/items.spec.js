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
        id: 1,
        name: 'pizza rolls',
        rating: 2.2
      })
    })
    beforeEach(() => {
      return Item.create({
        price: 5,
        id: 2,
        name: 'mcnuggets'
      })
    })
    const taters = {
      price: 3,
      id: 3,
      name: 'tater tots',
      description: 'bag of tater tots',
      rating: null,
      quantity: null,
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/3_D-Box.jpg',
      createdAt: '2020-09-22 15:07:51.558-04',
      updatedAt: '2020-09-22 15:07:51.558-04'
    }
    const updatedPizzaRolls = {
      price: 5,
      rating: 4.3
    }

    it('GET /api/items', async () => {
      const res = await request(app)
        .get('/api/items')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('pizza rolls')
      expect(res.body[1].name).to.be.equal('mcnuggets')
    })

    it('GET /api/items/:id', async () => {
      const res = await request(app)
        .get('/api/items/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('pizza rolls')
    })

    it('POST /api/items', async () => {
      const res = await request(app)
        .post('/api/items')
        .send(taters)
        .expect(201)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('tater tots')
    })

    it('PUT /api/items/:id', async () => {
      const res = await request(app)
        .put('/api/items/1')
        .send(updatedPizzaRolls)
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.price).to.be.equal(5)
      expect(res.body.rating).to.be.equal(4.3)
    })

    it('DELETE /api/items/:id', async () => {
      await request(app)
        .delete('/api/items/3')
        .expect(204)

      const res = await request(app)
        .get('/api/items/3')
        .expect(404)

      console.log('RES.BODY \n\n\n\n', res.body)
    })
  })
})
