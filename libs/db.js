const mongoose = require('mongoose')

mongoose.connection.on('connected', () => {
  console.log('Connection Established')
})

mongoose.connection.on('reconnected', () => {
  console.log('Connection Reestablished')
})

mongoose.connection.on('disconnected', () => {
  console.log('Connection Disconnected')
})

mongoose.connection.on('close', () => {
  console.log('Connection Closed')
})

mongoose.connection.on('error', (error) => {
  console.log('ERROR: ' + error)
})

module.exports = () => {
  const { DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env
  mongoose.connect(
    `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/e-commerce`,
    {
      useNewUrlParser: true,
      autoReconnect: true,
      reconnectTries: 1000,
      reconnectInterval: 5000,
    },
  )
}
