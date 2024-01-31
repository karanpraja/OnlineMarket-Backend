const express=require('express')
const { addToCart, fetchCartItemsByUserId } = require('../controller/CartController')
const router=express.Router()

router.post('/',addToCart)
.get('/:id',fetchCartItemsByUserId)

exports.router=router