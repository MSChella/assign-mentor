const mongoose = require('mongoose');

// Define the assign schema
const assignSchema = new mongoose.Schema({
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }
});

// Create the Assign model
const Assignment = mongoose.model('Assignment', assignSchema);

module.exports = Assignment;
