const { CategoryS } = require("../model/CategoryModel")


exports.CreateCategory=async(req,res)=>{
    const category=new CategoryS(req.body)
    const response=await category.save()
    console.log(response)
    try{
res.status(201).json(response)
    }catch(err){
        res.status(400).json(err)
    }
}
