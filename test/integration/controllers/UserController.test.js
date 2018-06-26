const assert = require('assert')
const supertest = require('supertest')

describe('UserController', () => {
  let request
  before(() => {
    request = supertest('http://localhost:3000/api/v1')
  })

  describe('headers', () => {
    it('should contain X-Powered-By header', done => {
      // 'x-powered-by': 'Node/6.2.0 fabrix/1.0.3',
      request
        .get('/user')
        .expect(200)
        .end((err, res) => {
          assert(/^Node.+fabrix/.test(res.headers['x-powered-by']))
          done(err)
        })
    })
  })
})
