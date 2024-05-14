require('dotenv').config();


const Mentor = require('../model/mentor.model');

// Controller methods
const getAllMentors = async (req, res) => {
    try {
        const mentors = await Mentor.find();
        res.json(mentors);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getMentorById = async (req, res) => {
    try {
        const mentor = await Mentor.findById(req.params.id);
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }
        res.json(mentor);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const createMentor = async (req, res) => {
    try {
        const newMentor = new Mentor(req.body);
        await newMentor.save();
        res.status(201).json(newMentor);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const updateMentor = async (req, res) => {
    try {
        const mentor = await Mentor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }
        res.json(mentor);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const deleteMentor = async (req, res) => {
    try {
        const mentor = await Mentor.findByIdAndDelete(req.params.id);
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }
        res.json({ message: 'Mentor deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Export controller methods
module.exports = {
    getAllMentors,
    getMentorById,
    createMentor,
    updateMentor,
    deleteMentor,
};
