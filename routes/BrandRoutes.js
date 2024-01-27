const express=require('express')
const { CreateBrand } = require('../controller/BrandController')
const router=express.Router()

router.post('/brand',CreateBrand)
exports.router=router;