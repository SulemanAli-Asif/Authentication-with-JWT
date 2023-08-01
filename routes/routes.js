const express=require('express');
const { signup_get, signup_post, login_get, login_post, logout_get } = require('../controller/controller');
const router=express.Router();

router.get('/',(req,res)=>{
    res.render("home")
  })
  router.get('/smoothies',(req,res)=>{
    res.render("smoothies")
  })

router.get('/signup',signup_get)
router.post('/signup',signup_post)


router.get('/login',login_get)
router.post('/login',login_post)

router.get('/logout',logout_get)
module.exports=router;