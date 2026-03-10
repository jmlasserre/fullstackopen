require('dotenv').config()
const dns = require('node:dns/promises')
dns.setServers(['1.1.1.1'])
const app = require('./app')
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
