const express = require('express');
const Student = require('../Models/student');
const Attendance = require('../Models/attendance');
const router = express.Router();

router.get('/viewattentance/:logid',async(req,res) => {
    try {
        const lognid = req.params.logid;
          console.log(lognid);
          if (!lognid) { 
          return res.status(401).send('Unauthorized: Login required');
          }
          const student = await Student.findOne({login: lognid});
          console.log(student);
          const data = await Attendance.find({Student:student._id}).populate('subject');
          res.json(data);
    } catch (error) {
        console.log('error fetching data',error);
        res.status(500).send('error fetching data');
    }
});
module.exports = router;