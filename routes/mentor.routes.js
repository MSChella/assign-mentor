const express = require('express');
const router = express.Router();
const mentorController = require('../controller/mentor.controller');

// Routes for mentors
router.get('/', mentorController.getAllMentors);
router.get('/:id', mentorController.getMentorById);
router.post('/', mentorController.createMentor);
router.put('/:id', mentorController.updateMentor);
router.delete('/:id', mentorController.deleteMentor);

module.exports = router;
