const chai = require('chai')
const { it, describe } = require('mocha')
const chaiHttp = require('chai-http')
const server = require('../index')
require('chai/register-should')

chai.use(chaiHttp)

describe('/GET healthz', () => {
  it('should return a 200 OK HTTP status', (done) => {
    chai.request(server)
      .get('/healthz')
      .end((err, res) => {
        if (err) throw new Error()
        res.should.have.status(200)
        res.body.should.deep.eql({ status: 'OK' })
        done()
      })
  })
})
