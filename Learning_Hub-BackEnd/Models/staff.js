const mongoose = require('mongoose');
const staffSchema = new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    gender:String,
    department:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Department'
    },
    login:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Login'
    },
    qualification:String,
    experience:Number,
    image:String,
    password:String
});
const Staff = mongoose.model('Staff',staffSchema);
module.exports = Staff;