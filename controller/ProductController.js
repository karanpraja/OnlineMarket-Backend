const {Product}=require('../model/ProductModel.js')

exports.createProduct=async (req,res)=>{
    console.log("working")
    const product= new Product(req.body)
    try{
        const response= await product.save()
res.status(201).json(response)
    }catch(err){
 res.status(400).json(err)
    }
    // res.json({hello:"hello"})
    // console.log(response)
    // ((err,doc)=>{
//         console.log({err,doc})
//         if(err){
// res.status(400).json(err)
//         }else{
// res.status(201).json(doc)
//         }
//     })
console.log('end')
}