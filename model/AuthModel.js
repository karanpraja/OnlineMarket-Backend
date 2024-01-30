const mongoose=require('mongoose')
const {Schema}=mongoose
const UserSchema=new Schema({
    name:{type:String},
email:{type:String,required:true,unique:true},
password:{type:String,required:true},
addresses:{type:[Schema.Types.Mixed]},
orders:{type:[Schema.Types.Mixed]}
})        
const virtual=UserSchema.virtual('id')
virtual.get(function(){
    return this.id
})
UserSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function(docs,ret){delete ret._id}
})
exports.UserSchema=mongoose.model("Auth",UserSchema)