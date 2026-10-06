require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const contactRoutes = require('./routes/contactRoutes')
const projectRoutes = require('./routes/projectRoutes')
const uploadRoutes = require('./routes/uploadRoutes')

const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/contact', contactRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/upload', uploadRoutes)


// MongoDB Connection
mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 15000,
  })
  .then(() => {
    console.log('MongoDB connected successfully')
  })
  .catch((err) => {
    console.error(
      'MongoDB connection failed:',
      err.message
    )
  })


// Start Server
app.listen(PORT, () => {
  console.log(
    `Server Connected successfully on port ${PORT}`
  )
})