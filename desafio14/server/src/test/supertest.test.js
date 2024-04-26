import supertest from 'supertest'
import * as chai from 'chai'

const expect = chai.expect
const requester = supertest('http://localhost:8000')

describe('Testing e-commerce', () => {
  let cookie

  describe('Testing login - register', () => {
    it('REGISTER', async () => {
      const user = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe33@email.com',
        password: '123',
        age: 33,
        role: 'user',
      }

      const response = await requester.post('/api/sessions/signup').send(user)
      expect(response._body.success).to.be.equal(true)
    })
    it('LOGIN', async () => {
      const user = {
        email: 'adminCoder@coder.com',
        password: 'adminCod3r123',
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
      expect(_body.user.user.email).to.be.equal('adminCoder@coder.com')
    })
  })
  describe('Testing products', () => {
    it('FETCH ALL PRODDUCTS', async () => {
      const response = await requester.get('/api/products')
      expect(response._body.productsData.success).to.be.equal(true)
    })
    it('ADD PRODUCT', async () => {
      const user = {
        email: 'adminCoder@coder.com',
        password: 'adminCod3r123',
      }

      const loginResponse = await requester
        .post('/api/sessions/login')
        .send(user)
      const cookieResult = loginResponse.headers['set-cookie'][0]
      expect(cookieResult).to.be.ok
      cookie = {
        name: cookieResult.split('=')[0],
        value: cookieResult.split('=')[1].split(';')[0],
      }
      expect(cookie.name).to.be.equal('connect.sid')

      const product = {
        title: 'Product Test',
        description: 'Product Test Description',
        price: 100,
        category: 'test',
        thumbnail: 'test',
        code: 'test',
        stock: 10,
        owner: '6603c5f944ec1b8c56b9b1c9',
      }

      const response = await requester.post('/api/products').send(product)
      expect(response._body.success).to.be.equal(true)
    })
    // it('DELETE PRODUCT', async () => {
    //   const response = await requester.delete('/api/products/6603c5f944ec1b8c56b9b1c9')
    //   expect(response._body.success).to.be.equal(true)
    // })
  })
})
