const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MONGODBURL = process.env.MONGODBURL;
const db = async() => {
    try {
        const con = await mongoose.connect(MONGODBURL);
        console.log(`mongoose connected:${con.connection.host}`);
    } catch (error) {
        console.log(`Error connecting to MongoDB`,error);
    }
};
module.exports = db;