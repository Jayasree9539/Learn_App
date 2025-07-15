const mongoose = require('mongoose');
const loginSchema = new mongoose.Schema({
    username: String,
    password: String,
    type: String
})
const Login = mongoose.model('Login',loginSchema);
module.exports=Login;