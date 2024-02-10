const express=require('express')
const { fetchUserById, updateLoggedInUserData,fetchAllUsers, removeUserInfo } = require('../controller/UserController')
const router=express.Router()

router.get('/own',fetchUserById)
.patch('/:id',updateLoggedInUserData)
.get('/rm',removeUserInfo)

exports.router=router



///learned how mongoose model works //how routing is set and how data is fetched!!