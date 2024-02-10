const mongoose=require('mongoose')
const {Schema}=mongoose
const UserSchema=new Schema({
    name:{type:String},
email:{type:String,required:true,unique:true},
password:{type:Buffer,required:true},
role:{type:String,require:true,default:"user"},
addresses:{type:[Schema.Types.Mixed],required:true,default:[]},
orders:{type:[Schema.Types.Mixed]},
salt:Buffer
},{timestamps: true})        
const virtual=UserSchema.virtual('id')
virtual.get(function(){
    return this._id
})
UserSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function(docs,ret){delete ret._id}
})
exports.UserSchema=mongoose.model("User",UserSchema)