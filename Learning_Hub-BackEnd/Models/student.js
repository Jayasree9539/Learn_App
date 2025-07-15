const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    name:String,
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course',
        default:null
    },
    department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Department'
    },
    login:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Login'
    },
    register:String,
    email:String,
    gender:String,
    dob: {
    type: Date,
    required: true
    },
    image:String,
    address:String,
    place:String,
    password:String
});
const Student = mongoose.model('Student',studentSchema);
module.exports = Student;