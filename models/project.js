const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    technologies: {
      type: [String],
      required: true,
    },

    githubUrl: {
      type: String,
      trim: true,
    },

    liveUrl: {
      type: String,
      trim: true,
    },

    image: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Project', projectSchema)