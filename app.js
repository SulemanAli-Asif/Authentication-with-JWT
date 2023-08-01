const express = require('express');
const { connect } = require('mongoose');
const mongoose = require('mongoose');
const connectDB = require('./DB/connect');
const router = require('./routes/routes');
const dotenv=require("dotenv");
const app = express();
const cookieParser=require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

dotenv.config();

const PORT=process.env.PORT||5000;
// middleware
app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json())//takes any JSON data passed through the request and passes it to the JS object which can be used through that object in the project
// view engine
app.set('view engine', 'ejs');



const start=()=>{

  app.listen(process.env.PORT,()=>{
    console.log(`Server runnign at http://localhost:${PORT}`);
  })
// database connection
connectDB();
}

start();
// routes
app.get('*',checkUser);
app.get('/',(req,res)=>{res.render("home")})
app.get('/smoothies',requireAuth,(req,res)=>{ res.render("smoothies")})
app.use(router);



