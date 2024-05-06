require('dotenv').config()

const mongoose = require('mongoose')

const URI = process.env.MONGODB_URI

console.log(`Connecting to ${URI}`)

mongoose.set('strictQuery', false)

mongoose
  .connect(URI)
  .then(() => {
    console.log('Connected successfully to MongoDB')
  })
  .catch((error) => {
    console.log(error)
  })

const schemaPerson = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /\d{2,3}-\d{8}/.test(v)
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
})

schemaPerson.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject._id = returnedObject._id.toString()
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', schemaPerson)
