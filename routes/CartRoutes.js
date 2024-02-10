const express=require('express')
const { addToCart, fetchCartItemsByUserId, updateCartItemById,  fetchCartItemsByItemId, deleteItemFromCart, resetCart } = require('../controller/CartController')
const router=express.Router()

router.post('/',addToCart)
.get('/id',fetchCartItemsByUserId)
.patch('/:id',updateCartItemById)
.delete('/item/:id',deleteItemFromCart)
.delete('/items/id',resetCart)
.get('/item/:id',fetchCartItemsByItemId)
exports.router=router