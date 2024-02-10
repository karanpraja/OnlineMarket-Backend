const express=require('express')
const { createUser, loginUser, getAllUsers, logoutUser, checkUser } = require('../controller/AuthController')
const passport = require('passport')
const  router=express.Router()

router.post('/signup',createUser)
.post('/login',passport.authenticate('local'),loginUser)
.get   ('/logout',logoutUser)
.get   ('/check',passport.authenticate('jwt'),checkUser)
.get('/',getAllUsers)

exports.router=router