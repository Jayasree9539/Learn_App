const mongoose = require('mongoose');
const subjectSchema = new mongoose.Schema({
    name: String,
    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Course'
    },
    discription: String
});
const Subject = mongoose.model('Subject',subjectSchema);
module.exports = Subject;