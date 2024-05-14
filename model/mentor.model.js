const mongoose = require('mongoose');

// Define the mentor schema
const mentorSchema = new mongoose.Schema({
    mentorname: {
        type: String,
        required: true,
    },
});

// Create the Mentor model
const Mentor = mongoose.model('Mentor', mentorSchema);

// Export the Mentor model
module.exports = Mentor;
