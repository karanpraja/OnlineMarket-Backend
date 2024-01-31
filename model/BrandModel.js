const mongoose=require('mongoose')
const Schema=mongoose.Schema

const BrandSchema=new Schema({
    // id:{type:String,required:true,unique:true},
    name:{type:String,required:true,unique:true},
    options:{type:[Schema.Types.Mixed],required:true}
})
const virtualId=BrandSchema.virtual('id');
virtualId.get(function(){
return this._id
})
BrandSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function(docs,ret){delete ret._id}
})

exports.BrandS=mongoose.model('Brands',BrandSchema)
