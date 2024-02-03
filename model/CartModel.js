const mongoose=require('mongoose')
const {Schema}=mongoose

const cartSchema=new Schema({
    user:{type:Schema.Types.ObjectId,ref:'User',required:true},
    productId:{type:String,required:true},
    product:{type:Schema.Types.ObjectId,ref:'Product',required:true},
    quantity:{type:Number,required:true}
})

const virtual=cartSchema.virtual('id')
virtual.get(function(){
    return this._id
})
cartSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function(docs,ret){delete ret.id}
})

exports.cartSchema=mongoose.model('cart',cartSchema)