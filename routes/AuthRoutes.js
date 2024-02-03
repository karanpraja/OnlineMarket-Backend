const express=require('express')
const { createUser, loginUser, getAllUsers } = require('../controller/AuthController')
const  router=express.Router()

router.post('/signup',createUser)
.post('/login',loginUser)
.get('/',getAllUsers)

exports.router=router