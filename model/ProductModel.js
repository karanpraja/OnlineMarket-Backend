const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String  ,required:true, unique:true },
  imagealt: { type: String  ,required:true},

  href: { type: String  ,required:true},
  imagealt: { type: String  ,required:true},
  price: {
    type: Number,required:true,
    min: [0, "wrong min price"],
    max: [10000, "wrong max price"],
  },
  discountPercentage: {
    type: Number,required:true,
    min: [0, "wrong min discountPercentage"],
    max: [99, "wrong max discountPercentage"],
  },
  rating: {
    type: Number,required:true,
    min: [0, "wrong min rating"],
    max: [5, "wrong max rating"],
    default: 0,
  },
  stock: { type: Number,required:true, min: [0, "wrong min stock"], default: 0 },
  brand: { type: String,required:true  },
  category: { type: String ,required:true },
  imageSrc: { type: String,required:true  },
  images: { type: [String],required:true  },
  delete: { type: Boolean,required:true,default:false  },
});
// const virtual=productSchema.virtual('id')
// virtual.get(function(){
//   return this._id
// })
// productSchema.set('toJSON',{
//   virtuals:true,
//   versionKey:false,
//   tranform:function(doc,ret){delete ret._id }
// })
const virtualId  = productSchema.virtual('id');
virtualId.get(function(){
    return this._id;
})
productSchema.set('toJSON',{
  virtuals: true,
  versionKey: false,
  transform: function (doc,ret) { delete ret._id}
})

exports.ProductSchema = mongoose.model("Product", productSchema);//it is used to make collection

