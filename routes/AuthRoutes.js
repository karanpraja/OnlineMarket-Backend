const express=require('express')
const { createUser, loginUser, getAllUsers } = require('../controller/AuthController')
const  router=express.Router()

router.post('/signup',createUser)
.get('/login',loginUser)
.get('/',getAllUsers)

exports.router=router