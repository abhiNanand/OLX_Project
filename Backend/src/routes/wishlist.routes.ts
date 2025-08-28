import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import Wishlist from "../models/wishlist.models";

const router = express.Router();

//update wishlist
router.post("/favourites", authMiddleware, async (req, res) => {
  try {
    const { product_id } = req.body;
    const user_id = req.user?.id;

    const existing = await Wishlist.findOne({user_id,product_id});
    if(existing){
      await Wishlist.deleteOne({_id:existing._id});
      return res.status(200).json({message:"Removed from favourites"});
    }
    else{
      await Wishlist.create({user_id,product_id});
      return res.status(200).json({message:"Added in Favourites"});
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
});


//get wishlist items
// router.get("/favourites", authMiddleware, async(req,res)=>{
//   try{
//     const user_id = req.user?.id;
//     const wishlistItems = await Wishlist.find({user_id}).populate('product_id');
//     const products = wishlistItems.map(item=>item.product_id);
//     return res.status(200).json({products});
//   }
//   catch(error){
//     return res.status(500).json({message:"Server error",error});
//   }
// });


router.get("/favourites", async (req, res) => {
  try {
    const wishlistItems = await Wishlist.find().populate("product_id");

    const products = wishlistItems.map(item => {
      const p:any = item.product_id;
      return {
        id: p._id,
        name: p.title,
        description: p.description,
        price: p.price,
        category: p.category,
        subcategory: p.subcategory,
        subcategory_details: {
          brand: p.brand,
          year: p.year,
        },
        city: p.city,
        state: p.state,
        created_at: p.createdAt,
        images: p.images, // rename photos -> images
        display_photo: p.images?.[0] || null, // first image
        user: p.sellerName,
        user_name: p.sellerName,
        phone: p.mobileNumber,
      };
    });

    return res.status(200).json(products );
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
});

export default router;