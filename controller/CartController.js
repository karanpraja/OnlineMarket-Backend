const { cartSchema } = require("../model/CartModel")

exports.addToCart=async(req,res)=>{
    const cartItems=new cartSchema(req.body)
    // console.log(cartItems)
    try {
        const response=await cartItems.save()
        console.log(response)
        const docs=await response.populate('product')
        res.status(201).json(docs)
    } catch (error) {
        console.log('err')
        res.status(400).json(error)
    }
}
exports.fetchCartItemsByUserId=async(req,res)=>{
    const {id}=req.user
    try {
        const cartItems=await cartSchema.find({user:id}).populate('product').exec()
        // console.log(cartItems)
        res.status(201).json(cartItems)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.updateCartItemById=async(req,res)=>{
    console.log("updateCartitem")
    const {id}=req.params
    console.log(id)
    try{
        const updatedCart=await cartSchema.findByIdAndUpdate(id,req.body,{new:true})
        const docs=await updatedCart.populate('product')
        console.log(docs)
        res.status(200).json(docs)
    }catch(error){
        console.log("err")
        res.status(400).json(error)
    }
}
 exports.deleteItemFromCart=async(req,res)=>{
    const {id}=req.params
    console.log(id)
    try{
        console.log("deleteItemFromCart")
        const updatedCart=await cartSchema.findByIdAndDelete(id)
        res.status(200).json(updatedCart)
    }catch(error){
        console.log("error")
        res.status(400).json(error)
    }
}
exports.resetCart=async(req,res)=>{
    const {id}=req.user
    console.log(id)
    try{
        console.log("deleteAllItems")
        const updatedCart=await cartSchema.deleteMany({user:id})
        const response="Items deleted:"+updatedCart.deletedCount
        res.status(200).json(response)
    }catch(error){
        console.log("error")
        res.status(400).json(error)
    }
}

exports.fetchCartItemsByItemId=async(req,res)=>{
    const {id}=req.params
    console.log(id)
    try {
        const cartItems=await cartSchema.find({_id:id}).populate('product').exec()
        console.log(cartItems)
        res.status(201).json(cartItems)
    } catch (error) {
        res.status(400).json(error)
    }
}