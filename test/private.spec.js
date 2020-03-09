const chai = require('chai')
const { it, describe } = require('mocha')
const chaiHttp = require('chai-http')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const server = require('../index')
require('chai/register-should')

dotenv.config()

chai.use(chaiHttp)

function genJWT () {
  return jwt.sign({ data: 'foobar' }, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
}

describe('/GET users', () => {
  it('should return an array of names', (done) => {
    chai.request(server)
      .get('/users')
      .set('Authorization', `Bearer ${genJWT()}`)
      .end((err, res) => {
        if (err) throw new Error()
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.length.should.be.eql(3)
        // Or in alternative, since so few elements are returned
        // res.body.should.be.deep.eql([ 'bob', 'alice', 'chuck' ])
        done()
      })
  })
})
