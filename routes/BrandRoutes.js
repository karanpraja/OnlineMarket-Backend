const express=require('express')
const { CreateBrand, fetchBrand } = require('../controller/BrandController')
const router=express.Router()

router.post('/brand',CreateBrand)
.get('/brands',fetchBrand)
exports.router=router;