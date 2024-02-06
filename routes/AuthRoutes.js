const express=require('express')
const { createUser, loginUser, getAllUsers, logoutUser } = require('../controller/AuthController')
const passport = require('passport')
const  router=express.Router()

router.post('/signup',createUser)
.post('/login',passport.authenticate('local'),loginUser)
.post   ('/logout',logoutUser)
.get('/',getAllUsers)

exports.router=router