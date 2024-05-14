const mongoose = require('mongoose');

// Define the student schema
const studentSchema = new mongoose.Schema({
    studentname: {
        type: String,
        required: true,
    },
    assignedStatus: {
        type: Boolean,
        required: true,
    },
});

// Create the Student model
const Student = mongoose.model('Student', studentSchema, 'students');

// Export the Student model
module.exports = Student;
