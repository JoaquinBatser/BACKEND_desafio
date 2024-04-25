import supertest from 'supertest'
import * as chai from 'chai'

const expect = chai.expect
const requester = supertest('http://localhost:8000')

describe('Testing e-commerce', () => {
  describe('Testing login - register', () => {
    let cookie
    it('REGISTER', async () => {
      const user = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe2@email.com',
        password: '123',
        age: 33,
        role: 'premium',
      }

      const response = await requester.post('/api/sessions/signup').send(user)
      expect(response._body.success).to.be.equal(true)
    })
    it('LOGIN', async () => {
      const user = {
        email: 'johndoe@email.com',
        password: '123',
      }

      const response = await requester.post('/api/sessions/login').send(user)
      const cookieResult = response.headers['set-cookie'][0]
      expect(cookieResult).to.be.ok
      cookie = {
        name: cookieResult.split('=')[0],

        value: cookieResult.split('=')[1].split(';')[0],
      }
      expect(cookie.name).to.be.equal('connect.sid')
    })
    it('CURRENT USER', async () => {
      const { _body } = await requester
        .get('/api/sessions/current')
        .set('Cookie', [`${cookie.name}=${cookie.value}`])
      expect(_body.user.user.email).to.be.equal('johndoe@email.com')
    })
  })
})
