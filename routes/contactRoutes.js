const express = require('express')
const Contact = require('../models/Contact')

const router = express.Router()

router.post('/', async (request, response) => {
  try {
    const { name, email, message } = request.body

    if (!name || !email || !message) {
      return response.status(400).json({ message: 'Name, email, and message are required.' })
    }

    const contact = await Contact.create({ name, email, message })
    return response.status(201).json({ message: 'Your message has been sent.', id: contact._id })
  } catch (error) {
    console.error('Contact form error:', error.message)
    return response.status(500).json({ message: 'Unable to send your message right now.' })
  }
})

module.exports = router
