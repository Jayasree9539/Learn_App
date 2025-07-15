const mongoose = require('mongoose');
const departmentSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String
});
const Department = mongoose.model('Department',departmentSchema);
module.exports = Department;