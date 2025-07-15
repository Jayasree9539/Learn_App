const express = require('express');
const User = require('../Models/customer');
const Login = require('../Models/loginModel');
const Staff = require('../Models/staff');
const Student = require('../Models/student');

const router = express.Router();

router.post('/register_post',async(req,res) =>{
    try {
        const {username, email, password} = req.body;
        console.log(req.body);

        const login = new Login({
            username: email,
            password: password,
            type: 'admin'
        });
        await login.save();
        const user = new User({
            username: username,
            email: email,
            login: login._id
        });
        await user.save();
        res.json({'status':'ok'});
    } catch (error) {
         res.status(500).send("Failed to Register",error);
         console.log(error);    
    }
});
router.post('/login_post', async (req, res) => {
  try {
    const { username, password } = req.body;
    const login = await Login.findOne({ username, password });

    if (!login) {
      return res.status(401).send('Invalid username or password');
    }

    let user;
    if (login.type === 'admin') {
      user = await User.findOne({ login: login._id });
    } else if (login.type === 'staff') {
      user = await Staff.findOne({ login: login._id });
    } else if (login.type === 'student') {
      user = await Student.findOne({ login: login._id });
    } else {
      return res.status(400).send('Invalid user type');
    }

    if (!user) {
      return res.status(404).send('User not found');
    }

    req.session.userid = user._id;
    req.session.logid = login._id;
    req.session.save();

    res.json({ status: 'ok', type: login.type, logid: login._id });
  } catch (error) {
    console.error('Failed to Login:', error);
    res.status(500).send('Server Error');
  }
});

router.post('/updatepassword_post', async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword, logid } = req.body;
        const loginId = logid
        console.log(req.body);
        

        const login = await Login.findById(loginId);
        if (!login) {
            return res.json({status:"no"});
        }


        if (login.password !== oldPassword) {
            return res.json({status:"no"});//check old password
            
        }


        if (newPassword !== confirmPassword) {
            return res.json({status:"no"});//check new password and confirm password
        }

        await Login.findByIdAndUpdate(loginId, { password: newPassword });//update

        res.json({status:'ok'});
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).send('Server error while changing password');
    }
});

module.exports = router;