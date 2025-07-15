const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  },
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff'
  },
  Student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  },
  attendance: {
    type: String,
    enum: ['Present', 'Absent']
  }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;
