const express = require("express");
const APP_SERVER = express();





const mentorRouter = require('./routes/mentor.routes');
const studentRouter = require('./routes/student.routes');
const assignRouter = require('./routes/assign.routes');


APP_SERVER.use('/api/mentor', mentorRouter);
APP_SERVER.use('/api/student', studentRouter);
APP_SERVER.use('/api/assign', assignRouter);


module.exports = APP_SERVER;