const express=require('express')
const { fetchUserById, updateLoggedInUserData,fetchAllUsers } = require('../controller/UserController')
const router=express.Router()

router.get('/:id',fetchUserById)
.patch('/:id',updateLoggedInUserData)

exports.router=router



///learned how mongoose model works //how routing is set and how data is fetched!!