const { cartSchema } = require("../model/CartModel")

exports.addToCart=async(req,res)=>{
    const cartItems=new cartSchema(req.body)
    console.log(cartItems)
    try {
        const response=await cartItems.save()
        console.log(response)
        res.status(201).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
}
exports.fetchCartItemsByUserId=async(req,res)=>{
    const {id}=req.params
    try {
        const cartItems=await cartSchema.find({user:id}).populate('products').populate('users').exec()
        console.log(cartItems)
        res.status(201).json(cartItems)
    } catch (error) {
        res.status(400).json(error)
    }
}