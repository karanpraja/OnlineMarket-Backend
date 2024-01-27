const express=require('express')
const { CreateCategory } = require('../controller/CategoryController')
const router=express.Router()

router.post('/category',CreateCategory)
exports.router=router