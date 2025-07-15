const mongoose = require('mongoose');
const assignSchema = new mongoose.Schema({
    staff:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Staff'
    },
    subject:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Subject'
    },
    date:{
        type:Date,
        default:Date.now
    }
});
const Assign = mongoose.model('Assign',assignSchema);
module.exports = Assign;