const express=require('express')
const { CreateCategory, fetchCategory } = require('../controller/CategoryController')
const router=express.Router()

router.post('/categories/:id',CreateCategory).get('/categories',fetchCategory)
exports.router=router