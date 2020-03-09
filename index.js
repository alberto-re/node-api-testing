const express = require('express')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const axios = require('axios')
const app = express()
const port = 3000

/*
 * This is just a slightly modified version of the Express.js "Hello, world"
 * example.
 *
 * It serves as a toy API server to show some testing techniques with
 * Mocha/Chai and obviously is not meant to be an example of a production
 * ready Express app.
 */

dotenv.config()

app.set('json spaces', 4)

// A publicy accessible health check endpoint
app.get('/healthz', (req, res) => res.status(200).json({ status: 'OK' }))

// An endpoint that requires a valid JWT for access
app.get('/users', async (req, res) => {
  try {
    const token = req.headers.authorization.substring(7)
    await jwt.verify(token, process.env.JWT_SECRET)
    res.status(200).json(['bob', 'alice', 'chuck'])
  } catch (err) {
    res.status(401).json({ status: 'Unauthorized' })
  }
})

// An endpoint relying on third-party API
app.get('/repos', async (req, res) => {
  try {
    const url = 'https://api.github.com/users/alberto-re/repos'
    const response = await axios.get(url)
    res.status(200).json(response.data.map(e => e.name))
  } catch (err) {
    res.status(500).json({ status: 'Internal Server Error', message: err })
  }
})

app.listen(port)

// Export is required for testing
module.exports = app
