const express = require('express');
const router = express.Router();
const assignController = require('../controller/assign.controller');

// Routes for mentors
router.get('/getstudentsbymentor', assignController.getStudentsByMentor);
router.get('/getpreviousmentorforstudent', assignController.getPreviousMentorForStudent);
router.get('/', assignController.getAllUnassignedStudents);
router.get('/:id', assignController.getAssignById);
router.post('/assign', assignController.createAssign);
router.post('/assignorchange', assignController.assignOrChangeMentor);
router.post('/assignmentortostudent', assignController.assignMentorToStudent);

module.exports = router;
