const express = require('express');
const port = 3002;
const session = require('express-session');
const dotenv = require('dotenv');
const db = require('./config/db');
db();
const app = express();
const MainRoute = require('./Routes/MainRoutes');
const AdminRoute = require('./Routes/AdminRoutes');
const StaffRoute = require('./Routes/StaffRoutes');
const StudentRoute = require('./Routes/StudentRoutes');

const cors = require('cors');
app.use(express.static('public'));
app.set('view engine','ejs');
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret:'app_key',
    resave:true,
    saveUninitialized:true,
}));    

app.use('/',MainRoute);
app.use('/',AdminRoute);
app.use('/',StaffRoute);
app.use('/',StudentRoute);
app.use(express.static('Style'));
app.listen(3002,() => {
    console.log('Running port is http://localhost:3002');
});
