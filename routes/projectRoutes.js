const express = require('express')
const Project = require('../models/project')

const router = express.Router()


// =========================================
// GET ALL PROJECTS
// =========================================

router.get('/', async (request, response) => {

  try {

    const projects = await Project
      .find()
      .sort({ createdAt: -1 })


    response.status(200).json(projects)

  } catch (error) {

    console.error(
      'Get projects error:',
      error.message
    )


    response.status(500).json({
      message: 'Unable to fetch projects.',
    })

  }

})


// =========================================
// CREATE NEW PROJECT
// =========================================

router.post('/', async (request, response) => {

  try {

    const {
      title,
      description,
      technologies,
      githubUrl,
      liveUrl,
      image,
    } = request.body


    // Required fields

    if (
      !title ||
      !description ||
      !technologies
    ) {

      return response.status(400).json({
        message:
          'Title, description and technologies are required.',
      })

    }


    // Create project

    const newProject = await Project.create({

      title,

      description,

      technologies,

      githubUrl,

      liveUrl,

      image,

    })


    response.status(201).json({

      message:
        'Project added successfully',

      project:
        newProject,

    })


  } catch (error) {

    console.error(
      'Create project error:',
      error.message
    )


    response.status(500).json({

      message:
        'Server Error',

    })

  }

})


// =========================================
// UPDATE PROJECT
// =========================================

router.put('/:id', async (request, response) => {

  try {

    const {
      title,
      description,
      technologies,
      githubUrl,
      liveUrl,
      image,
    } = request.body


    const updatedProject =
      await Project.findByIdAndUpdate(

        request.params.id,

        {
          title,
          description,
          technologies,
          githubUrl,
          liveUrl,
          image,
        },

        {
          new: true,
          runValidators: true,
        }

      )


    // Project not found

    if (!updatedProject) {

      return response.status(404).json({

        message:
          'Project not found.',

      })

    }


    response.status(200).json({

      message:
        'Project updated successfully.',

      project:
        updatedProject,

    })


  } catch (error) {

    console.error(
      'Update project error:',
      error.message
    )


    response.status(500).json({

      message:
        'Unable to update project.',

    })

  }

})


// =========================================
// DELETE PROJECT
// =========================================

router.delete('/:id', async (request, response) => {

  try {

    const deletedProject =
      await Project.findByIdAndDelete(
        request.params.id
      )


    // Project not found

    if (!deletedProject) {

      return response.status(404).json({

        message:
          'Project not found.',

      })

    }


    response.status(200).json({

      message:
        'Project deleted successfully.',

    })


  } catch (error) {

    console.error(
      'Delete project error:',
      error.message
    )


    response.status(500).json({

      message:
        'Unable to delete project.',

    })

  }

})


module.exports = router