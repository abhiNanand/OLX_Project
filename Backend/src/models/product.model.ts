import mongoose, {Schema, model} from 'mongoose';


const productSchema = new Schema({
 brand: {type: String, required: true},
 year: {type: Number, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: Number, required: true},
  images: [{type:String}],
  state: {type: String, required: true},
  city: {type: String, required: true},
  sellerName: {type: String, required: true},
  mobileNumber: {type: String, required: true},
  category: {type: String, required: true},
  subcategory: {type: String, required: true},
},{timestamps:true});

const Product = model('Product', productSchema);

export default Product;