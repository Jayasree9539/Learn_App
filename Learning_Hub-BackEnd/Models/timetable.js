const mongoose = require('mongoose');
const timetableSchema  = new mongoose.Schema({
    subject:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Subject'
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    },
    day:String,
    startTime:String,
    endTime:String
});
const Timetable = mongoose.model('Timetable',timetableSchema);
module.exports = Timetable;