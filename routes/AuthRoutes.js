const express=require('express')
const { createUser, loginUser } = require('../controller/AuthController')
const  router=express.Router()

router.post('/signup',createUser)
.get('/login',loginUser)

exports.router=router