const express = require('express')
const app = express()
const port = process.env.PORT
const languageRegEx = /^([^,]*),.*$/
const softwareRegEx = /.*\((.*;[^\(]*)\).*/

app.get('/', function (req, res) {
  res.send('It works!')
})

app.get('/api/whoami', (req, res) => {
  res.send({
    'ipaddress': req.header('x-forwarded-for'),
    'language': languageRegEx.exec(req.header('accept-language'))[1],
    'software': softwareRegEx.exec(req.header('user-agent'))[1]
  })
})

app.get('/api/whoami/raw', (req, res) => {
  res.send({
    'ipaddress': req.header('x-forwarded-for'),
    'language': req.header('accept-language'),
    'software': req.header('user-agent')
  })
})

app.listen(port, function () {
  console.log('Example app listening on port', port)
})