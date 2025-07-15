const mongooge = require('mongoose');
const courseSchema = new mongooge.Schema({
    name: String,
    department: {
        type: mongooge.Schema.Types.ObjectId,
        ref: 'Department'
    }
});
const Course = mongooge.model('Course',courseSchema);
module.exports = Course;