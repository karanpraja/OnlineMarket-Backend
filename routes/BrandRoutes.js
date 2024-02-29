const express=require('express')
const { CreateBrand, fetchBrand } = require('../controller/BrandController')
const router=express.Router()

router.post('/brands/:id',CreateBrand)
.get('/brands',fetchBrand)
exports.router=router;