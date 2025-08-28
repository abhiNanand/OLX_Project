import mongoose, {Schema, model} from 'mongoose';

const wishlistSchema = new Schema({
user_id: {
  type:mongoose.Schema.Types.ObjectId,
  ref:"User",
  required:true,
},
product_id:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Product",
  required:true,
},
},
{timestamps:true}
);

const Wishlist = model("Wishlist", wishlistSchema);

export default Wishlist;