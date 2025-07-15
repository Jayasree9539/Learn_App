const express = require('express');
const Staff = require('../Models/staff');
const Timetable = require('../Models/timetable');
const Assign = require('../Models/assignSub');
const Course = require('../Models/course');
const Student = require('../Models/student');
const Attendance = require('../Models/attendance');
const router = express.Router();

router.get('/staff_profile/:logid', async (req, res) => {
  try {
    const lognid = req.params.logid;
    console.log(lognid);
    if (!lognid) { 
      return res.status(401).send('Unauthorized: Login required');
    }
    const data = await Staff.findOne({ login: lognid }).populate('department');
    res.json(data);
  } catch (error) {
    console.error('Error retrieving staff data:', error);
    res.status(500).send('Error fetching data');
  }dxz
});

router.get('/view_TimeTable',async(req, res) => {
    try {
        let data = await Timetable.find().populate('course').populate('subject');
        console.log(data);
        
        res.json(data);
    } catch (error) {
        console.log('error fetching data',error);
        res.status(500).send('error fetching data');
    }
});
router.get('/viewfulldetails/:logid', async(req, res) => {
        try {
          const lognid = req.params.logid;
          console.log(lognid);
          if (!lognid) { 
          return res.status(401).send('Unauthorized: Login required');
          }
          const staff = await Staff.findOne({login: lognid});
          console.log(staff);
          
          const data = await Assign.find({ staff: staff._id })
           .populate({
             path: 'subject',
             populate: {
             path: 'course'
            }
          });
          res.json(data);
          console.log(data);
          
        }catch (error) {
          console.log('error fetching data',error);
          res.status(500).send('error fetching data');
        }
});
router.get('/listofstudentsincourse', async (req, res) => {
    try {
        const course = await Course.findOne();
        if (course) {
            const data = await Student.find({ course: course._id });
            res.json(data);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.post('/submitattendance', async (req, res) => {
  const attendanceData = req.body;

  try {
    const attendanceRecords = await Promise.all(attendanceData.map(async (entry) => {

      console.log(entry);
      const sid=await Staff.findOne({login:entry.staff})
      const newAttendance = new Attendance({
        Student: entry.studentId,
        attendance: entry.attendance,
        subject: entry.subject,  // Pass subjectId from frontend if needed
        staff: sid._id      // Pass staffId from frontend if needed
      });
      return await newAttendance.save();
    }));
    res.json({'status':'ok'});
  } catch (error) {
    console.error("Error saving attendance:", error);
    res.status(500).json({ message: 'Failed to save attendance' });
  }
});

module.exports = router;