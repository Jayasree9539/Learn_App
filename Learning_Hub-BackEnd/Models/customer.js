const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    login:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Login'
    }
})
const User = mongoose.model('User',UserSchema);
module.exports = User;