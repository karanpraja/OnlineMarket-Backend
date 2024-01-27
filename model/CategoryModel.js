const mongoose=require('mongoose')
const Schema=mongoose.Schema


const CartegorySchema=new Schema({
    name:{type:String,required:true,unique:true},
    options:{type:[Schema.Types.Mixed],required:true}
})


const virtualId=CartegorySchema.virtual('id')
virtualId.get(function(){
return this._id
})
CartegorySchema.set('toJSON',{
virtuals:true,
versionKey:false,
transform:function(docs,ret){delete ret._id}
})


exports.CategoryS=mongoose.model('Category',CartegorySchema)