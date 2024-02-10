const {ProductSchema}=require('../model/ProductModel.js')

exports.createProduct=async (req,res)=>{
    console.log("working")
    const product= new ProductSchema(req.body)
    console.log(req.body)
    try{
        console.log("createProduct")
        const response= await product.save()
res.status(201).json(response)
// console.log(response)

    }catch(err){
        console.log("error")
 res.status(400).json(err)
    }
console.log('end')
}

exports.fetchProductByFilter=async(req,res)=>{
let query=ProductSchema.find({})
let totalProductsQuery=ProductSchema.find({})
if(req.query.category){
    query=query.find({category:req.query.category})
    totalProductsQuery=totalProductsQuery.find({category:req.query.category})
}
if(req.query.brand){
    query=query.find({brand:req.query.brand})
    totalProductsQuery=totalProductsQuery.find({brand:req.query.brand})
}
if(req.query._sort&&req.query._order){
    query=query.sort({[req.query._sort]:req.query._order})

}
if(req.query._page&&req.query._limit)
{
const page=req.query._page
const pageSize=req.query._limit 
    query=query.skip(pageSize*(page-1)).limit(pageSize)
}
const totalDocs=await totalProductsQuery.count().exec()
try{
    const docs=await query.exec()
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.set('X-Total-Count',totalDocs)
    
res.status(200).json(docs)
}catch(err){
res.status(400).json(err)
}

}

exports.fetchProductById=async(req,res)=>{
    const {id}=req.params
try{
const product= await ProductSchema.findById(id)
    res.status(200).json(product)
console.log(product)
}catch(err){
    res.status(400).json(err)
}

}

exports.updateProductById=async (req,res)=>{
const {id}=req.params
console.log(id)
try{
const product=await ProductSchema.findByIdAndUpdate(id,req.body,{new:true})
console.log(product)
res.status(200).json(product)
}catch(err){
res.status(400).json(err)
}
}






























