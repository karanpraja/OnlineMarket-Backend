const express=require("express")
const { OrderItemsByUser,  filterAllOrdersByUserId, fetchLoggedInUserOrders, updateOrders } = require("../controller/OrderController")
const router=express.Router()

router.post('/',OrderItemsByUser)
.get('/',filterAllOrdersByUserId)
.get('/id',fetchLoggedInUserOrders)
.patch('/:id',updateOrders)
// .get('/filter/:id',filterAllOrdersByUserId)

exports.router=router