const express = require('express')
const multer = require('multer')
const cloudinary = require('../config/cloudinary')

const router = express.Router()

const upload = multer({
  storage: multer.memoryStorage(),
})

// Upload project image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'Please select an image.',
      })
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'angshu-portfolio/projects',
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error)

          return res.status(500).json({
            message: 'Image upload failed.',
          })
        }

        res.status(200).json({
          message: 'Image uploaded successfully.',
          imageUrl: result.secure_url,
        })
      }
    )

    uploadStream.end(req.file.buffer)
  } catch (error) {
    console.error('Upload error:', error)

    res.status(500).json({
      message: 'Server error.',
    })
  }
})

module.exports = router