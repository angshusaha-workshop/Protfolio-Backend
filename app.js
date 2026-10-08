require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const contactRoutes = require('./routes/contactRoutes')
const projectRoutes = require('./routes/projectRoutes')
const uploadRoutes = require('./routes/uploadRoutes')

const app = express()
const MONGODB_URI = process.env.MONGODB_URI

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

let mongoReadyPromise = null

const connectMongo = () => {
  if (!MONGODB_URI) {
    return Promise.reject(
      new Error('MONGODB_URI is not configured')
    )
  }

  if (mongoose.connection.readyState === 1) {
    return Promise.resolve()
  }

  if (!mongoReadyPromise) {
    mongoReadyPromise = mongoose
      .connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 15000,
      })
      .then(() => {
        console.log('MongoDB connected successfully')
      })
      .catch((err) => {
        mongoReadyPromise = null
        console.error('MongoDB connection failed:', err.message)
        throw err
      })
  }

  return mongoReadyPromise
}

app.use(async (req, res, next) => {
  try {
    await connectMongo()
    next()
  } catch (error) {
    res.status(503).json({
      message: 'Database unavailable. Try again shortly.',
    })
  }
})

app.use('/api/contact', contactRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/upload', uploadRoutes)

module.exports = app
