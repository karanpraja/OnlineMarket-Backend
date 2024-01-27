const { BrandS } = require("../model/BrandModel")

exports.CreateBrand=async(req,res)=>{
    const Brand=new BrandS(req.body)
    const response= await Brand.save()
    try{
        res.status(201).json(response)
        console.log(response)
    }catch(err){
        res.status(400).json(err)
    }
}
