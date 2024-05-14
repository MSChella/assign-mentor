require('dotenv').config();


const Assignment = require('../model/assign.model');
const Student = require('../model/student.model');

// Controller methods
const getAllUnassignedStudents = async (req, res) => {
    try {
        const unassignedStudents = await Student.find({ assignedStatus: false });
        res.json(unassignedStudents);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getAssignById = async (req, res) => {
    try {
        const assign = await Assign.findById(req.params.id);
        if (!assign) {
            return res.status(404).json({ message: 'Assign not found' });
        }
        res.json(assign);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const createAssign = async (req, res) => {
    try {
        const { mentorId } = req.body;
        const unassignedStudents = await Student.find({ assignedStatus: false });

        // Loop through the array of unassignedStudents and assign each student to the mentor
        const assignments = unassignedStudents.map(student => ({
            mentor: mentorId,
            student: student._id // Assuming _id is the unique identifier for each student
        }));

        // Bulk insert assignments
        await Assignment.insertMany(assignments);

        res.status(201).json({ message: 'Students assigned successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
const assignOrChangeMentor = async (req, res) => {
    try {
        const { studentId, newMentorId } = req.body;
        const updatedStudent = await Student.findByIdAndUpdate(studentId, { mentor: newMentorId }, { new: true });
        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(updatedStudent);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
const assignMentorToStudent = async (req, res) => {
    try {
        const { studentId, mentorId } = req.body;
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        if (student.mentor) {
            return res.status(400).json({ message: 'Student already has a mentor assigned' });
        }
        student.mentor = mentorId;
        await student.save();
        res.json(student);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
const getStudentsByMentor = async (req, res) => {
    try {
        const { mentorId } = req.params;
        const students = await Student.find({ mentor: mentorId });
        res.json(students);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getPreviousMentorForStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        const previousMentorId = student.previousMentor;
        res.json({ previousMentorId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};


// Export controller methods
module.exports = {
    getStudentsByMentor,
    getPreviousMentorForStudent,
    getAllUnassignedStudents,
    getAssignById,
    createAssign,
    assignOrChangeMentor,
    assignMentorToStudent,

};
