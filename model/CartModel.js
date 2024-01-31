const mongoose=require('mongoose')
const {Schema}=mongoose

const cartSchema=new Schema({
    user:{type:String,required:true,ref:'User'},
    productId:{type:Number,required:true},
    product:{type:Schema.Types.ObjectId,required:true,ref:'Product'},
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