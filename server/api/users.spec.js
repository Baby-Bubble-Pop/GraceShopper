/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    let session = null
    beforeEach(done => {
      request('http://localhost:8080')
        .post('/auth/login')
        .send({
          email: 'admin-1@email.com',
          password: 'admin1'
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          session = res.header['set-cookie']
          done()
        })
    })
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail,
        role: 'admin'
      })
    })

    it('GET /api/users', async () => {
      const res = await request('http://localhost:8080')
        .get('/api/users')
        .set('Cookie', session)
        .expect(200)

      expect(res.body).to.be.an('array')
      //changed from cody's email to seeded email address:
      expect(res.body[0].email).to.be.equal('1@email.com')
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
