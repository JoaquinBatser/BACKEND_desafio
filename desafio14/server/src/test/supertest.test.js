import supertest from 'supertest'
import * as chai from 'chai'

const expect = chai.expect
const requester = supertest('http://localhost:8000')

describe('Testing e-commerce', () => {
  describe('Testing login - register', () => {
    it('REGISTER', async() => {
      
      const user = {
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@email.com",
        password: "123",
        age: 33,
        role: "premium"
      }

      const response = await requester.post('/api/sessions/signup').send(user)
    
    })
    it('LOGIN', async() => {

      const user = {
        email: "johndoe@email.com",
        password: "123"
      } 

      const response = await requester.post('/api/sessions/login').send(user)
      const cookie = response.headers('set-cookie'[0])
      expect(response.statusCode).to.be.equal(200)

    })
  })
  
})
