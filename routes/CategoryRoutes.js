const express=require('express')
const { CreateCategory, fetchCategory } = require('../controller/CategoryController')
const router=express.Router()

router.post('/category',CreateCategory).get('/categories',fetchCategory)
exports.router=router