const { OrderSchema } = require("../model/OrderModel")

exports.OrderItemsByUser=async(req,res)=>{
    console.log("OrderItemsByUser")
    const Order=new OrderSchema(req.body)
    try{
    // const response=await Order.getIndexes()
    const docs=await Order.save()

    console.log(docs)
res.status(201).json(docs)
    }catch(error){
        console.log(error)
        res.status(400).json(error)
    }
}

exports.filterAllOrdersByUserId=async(req,res)=>{
    console.log("allUserorders")
    // const {id}=req.params
    let query=OrderSchema.find({})
    let totalProductsQuery=OrderSchema.find({})
    if(req.query._sort&&req.query._order){
        query=query.sort({[req.query._sort]:req.query._order})
    }
    if(req.query._page&&req.query._limit){
        const page=req.query._page
        const pageSize=req.query._limit
        query=query.skip(pageSize*(page-1)).limit(pageSize)
    }
    const totalDocs=await totalProductsQuery.count().exec()
    console.log(totalDocs)
    try{
      const docs=await query.exec()
      res.set('X-Total-Count',totalDocs)
        res.status(200).json(docs)
    }catch(err){
res.status(400).json(err)
    }
}
exports.fetchLoggedInUserOrders=async(req,res)=>{
    const {id}=req.user
    try{
    const response=await OrderSchema.find({user:id})
        // console.log(response)
        res.status(200).json(response)
    }catch(err){
        res.status(400).json(err)
    }
}
exports.updateOrders=async(req,res)=>{
    console.log("updateOrder")
    const {id}=req.params
    try{
        const response=await OrderSchema.findByIdAndUpdate(id,req.body,{new:true})
        console.log(response)
        res.status(200).json(response)
    }catch(err){
        res.status(400).json(err)
    }
}

