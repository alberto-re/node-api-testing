const chai = require('chai')
const { it, describe } = require('mocha')
const chaiHttp = require('chai-http')
const dotenv = require('dotenv')
const nock = require('nock')
const server = require('../index')
require('chai/register-should')

dotenv.config()

chai.use(chaiHttp)

const mockedReply = [
  {
    name: 'adventofcode2019',
    full_name: 'alberto-re/adventofcode2019',
    private: false
  },
  {
    name: 'gol-python',
    full_name: 'alberto-re/gol-python',
    private: false
  }
]

nock('https://api.github.com')
  .get('/users/alberto-re/repos')
  .reply(200, mockedReply)

describe('/GET repos', () => {
  it('should return a list of public repositories', (done) => {
    chai.request(server)
      .get('/repos')
      .end((err, res) => {
        if (err) throw new Error()
        res.should.have.status(200)
        res.body.should.deep.eql(['adventofcode2019', 'gol-python'])
        done()
      })
  })
})
