const express=require('express')
const { addToCart, fetchCartItemsByUserId, updateCartItemById, deleteItemsFromCart, fetchCartItemsByItemId } = require('../controller/CartController')
const router=express.Router()

router.post('/',addToCart)
.get('/:id',fetchCartItemsByUserId)
.patch('/:id',updateCartItemById)
.delete('/:id',deleteItemsFromCart)
.get('/item/:id',fetchCartItemsByItemId)
exports.router=router