const { BrandS } = require("../model/BrandModel")
exports.fetchBrand=async(req,res)=>{
    // console.log('fetchbrand')
    try{
        const response= await BrandS.find({}).exec()
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.status(201).json(response)
        // console.log(response)
    }catch(err){
        res.status(400).json(err)
    }
}
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
