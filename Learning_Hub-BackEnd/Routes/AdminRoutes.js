const express = require('express');
const Department = require('../Models/department');
const Course = require('../Models/course');
const Subject = require('../Models/subject');
const router = express.Router();
const multer = require('multer');
const Staff = require('../Models/staff');
const Login = require('../Models/loginModel');
const Student = require('../Models/student');
const Timetable = require('../Models/timetable');
const Assign = require('../Models/assignSub');

const storage = multer.diskStorage({
        destination:(req,file,cb) => {
            cb(null,'public');
        },
        filename:(req,file,cb) => {
            cb(null,Date.now() +  '.jpg');
        },
    });
    
const upload = multer({storage:storage});

//add department
router.post('/adddep_post',async(req, res) => {
    try {
       const {name, email, phone,} = req.body;

       const department = new Department({
        name: name,
        email:email,
        phone:phone
       });
       await department.save();
       res.json({'status':'ok'})
    } catch (error) {
        console.log('error detailes',error);
        res.status(500).send("Error adding department");
    }
});

//view department details
router.get('/view_dep',async(req,res) => {
    try {
        let data = await Department.find()
        console.log(data);
        res.json(data);
    } catch (error) {
        console.log('error retreving data',error);
        res.status(500).send('Error fetching data');
    }
});

//edit department details
router.post('/edit_dep/:id', async (req, res) => {
  try {
        const { name, email, phone } = req.body;
        await Department.findByIdAndUpdate(req.params.id, {
            name,
            email,
            phone
        });
        res.json({ message: 'Department updated successfully'});
    } catch (error) {
        console.log('Error updating shop owner:', error);
        res.status(500).send("Error updating shop owner");
    }
});
//delete department details
router.get('/delete_dep/:id',async(req, res) => {
    try {
        await Department.findByIdAndDelete(req.params.id);
        res.json({message:'department deleted'});
    } catch (error) {
        console.log('Error deleting department',error);
        res.status(500).send('Error deleting department');
    }
});

//add course
router.post('/addcourse_post',async(req, res) => {
    try {
        const {name, department} = req.body;
        const course = new Course({
            name,
            department 
        });
        await course.save();
        res.json({'status':'ok'});
    } catch (error) {
        console.log('Error adding course');
        res.status(500).send('Error adding course');
    }
});

//view course details
router.get('/view_course', async(req, res) => {
    try {
       let data = await Course.find().populate('department')
       console.log(data);
       res.json(data);
    } catch (error) {
        console.log('error fetching data',error);
        res.status(500).send('error fetching data');
    }
});

//edit course details
router.post('/edit_course/:id', async(req, res) => {
    try {
        const{name, department} = req.body;
        await Course.findByIdAndUpdate(req.params.id,{
            name,
            department
        });
        res.json({message:'Course updated Successfully'});
    } catch (error) {
        console.log('Error updating course',error);
        res.status(500).send('error Updating course');
    }
});

//deleting course
router.get('/delete_course/:id',async(req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.json({message:'course Deleted'});
    } catch (error) {
        console.log('Error deleting course',error);
        res.status(500).send('error deleting course');
    }
});
//add subject
router.post('/addsub_post', async(req, res) => {
    try {
        const {name, course} = req.body;
        const subject = new Subject({
            name,
            course
        });
        await subject.save();
        res.json({'status':'ok'});
    } catch (error) {
        console.log('Error adding subject',error);
        res.status(500).send('Error Adding Subject');
   }
});

//view subject details
router.get('/view_sub',async(req, res) => {
    try {
        let data = await Subject.find().populate('course')
        console.log(data);
        res.json(data);
    } catch (error) {
        console.log('error fetching data',error);
        res.status(500).send('error fetching data');
    }
});

//delete subject
router.get('/delete_subject/:id',async(req, res) => {
    try {
        await Subject.findByIdAndDelete(req.params.id);
        res.json({message:'subject Deleted'});
    } catch (error) {
        console.log('Error deleting subject',error);
        res.status(500).send('error deleting subject');
    }
});

//add staff
router.post('/addstaff_post', upload.single('image'), async(req, res) => {
    try {
        const {name, email, phone, gender, department,qualification,experience,password} = req.body;
        const image = req.file.filename;

        const login = new Login({
            username: email, 
            password: password,
            type: 'staff'
        });
        await login.save();

        let staff = new Staff({
            name,
            email,
            phone,
            gender,
            department,
            login: login._id,
            qualification,
            experience,
            image
        });
        await staff.save();
        res.json({'status':'ok'});
    } catch (error) {
        console.log('Error adding staff',error);
        res.status(500).send('Failed to add Staff');   
    }
});

//view staff details
router.get('/view_staff',async(req, res) => {
    try {
        let data = await Staff.find().populate('department');
        console.log(data);
        res.json(data);
    } catch (error) {
        console.log('error fetching data',error);
        res.status(500).send('error fetching data');
    }
});

//delete staff
router.get('/delete_staff/:id',async(req, res) => {
    try {
        await Staff.findByIdAndDelete(req.params.id);
        res.json({message:'staff Deleted'});
    } catch (error) {
        console.log('Error deleting staff',error);
        res.status(500).send('error deleting staff');
    }
});

//add students
router.post('/addstudent_post',upload.single('image'),async(req, res) => {
    try {
        const {name, course, department, register, email, gender, dob, address, place, password } = req.body;
        const image = req.file.filename;

        const login = new Login({
            username: email, 
            password: password,
            type: 'student'
        });
        await login.save();
        let student = new Student({
            name,
            course, 
            department,
            login: login._id,
            register,
            gender,
            dob,
            address,
            place,
            image
        });
        await student.save();
        res.json({'status':'ok'});
    } catch (error) {
        console.log('Error adding student',error);
        res.status(500).send('Failed to add student');   
    }
});

//view students details
router.get('/view_student',async(req, res) => {
    try {
        let data = await Student.find().populate('department').populate('course');
        console.log(data);
        res.json(data);
    } catch (error) {
        console.log('error fetching data',error);
        res.status(500).send('error fetching data');
    }
});

//delete student
router.get('/delete_student/:id',async(req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({message:'student Deleted'});
    } catch (error) {
        console.log('Error deleting student',error);
        res.status(500).send('error deleting student');
    }
});

// create TimeTable
router.post('/timetable_post', async(req, res) => {
    try {
        const {subject, course, day, startTime, endTime} = req.body;
        const timetable = new Timetable({
            subject,
            course,
            day,
            startTime,
            endTime
        });
        await timetable.save();
        res.json({'status':'ok'});
    } catch (error) {
        console.log('Error creating timetable',error);
        res.status(500).send('Error creating timetable');  
    }
});

//assign subject to staff
router.post('/assign_sub',async(req, res) => {
    try {
        const {subject, staff} = req.body;
        const assignstaff = new Assign({
            subject,
            staff
        });
        await assignstaff.save();
        res.json({'status':'ok'})
    } catch (error) {
        console.log('Error assign subject',error);
        res.status(500).send('Error assign subject');  
    }
});

module.exports = router;