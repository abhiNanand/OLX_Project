import express from "express";
import Product from "../models/product.model";
import { upload } from "../middleware/uploadImage";
import Wishlist from "../models/wishlist.models";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

//add ads
router.post(
  "/putad",
  upload.array("photos"),
  authMiddleware,
  async (req, res) => {
    try {
      const {
        brand,
        year,
        title,
        description,
        price,
        state,
        city,
        sellerName,
        mobileNumber,
        category,
        subcategory,
      } = req.body;

      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const images = (req.files as Express.Multer.File[]).map(
        (file) => `uploads/${file.filename}`
      );

      const product = new Product({
        brand,
        year,
        title,
        description,
        price,
        images,
        state,
        city,
        sellerName,
        mobileNumber,
        category,
        subcategory,
        userId,
      });

      await product.save();

      res.status(201).json({ message: "Product added successfull", product });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  }
);

//get all ads
router.get("/list", async (req, res) => {
  try {
    let { page = 1, limit = 20, search = "" } = req.query;
    const userId = req.query.userId;

    // Build query
    let validUserId =
      userId && userId !== "null" && userId !== "undefined" ? userId : null;

    page = parseInt(page as string, 10);
    limit = parseInt(limit as string, 10);

    // Build search query
    const query: any = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { subcategory: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
        { state: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Map products into frontend expected format
    const formattedProducts = await Promise.all(
      products.map(async (p) => {
        let is_favourite = false;
        if (validUserId) {
          const find = await Wishlist.findOne({
            user_id: validUserId,
            product_id: p._id,
          });
          if (find) is_favourite = true;
        }

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
          images: p.images,
          display_photo: p.images?.[0] || null,
          user: p.sellerName,
          user_name: p.sellerName,
          phone: p.mobileNumber,
          is_favourite,
        };
      })
    );

    res.status(200).json(formattedProducts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// get ads details
router.get("/item", async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) return res.status(400).json({ message: "Product id is required" });
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({
      id: product._id,
      name: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      subcategory: product.subcategory,
      subcategory_details: {
        brand: product.brand,
        year: product.year,
      },
      city: product.city,
      state: product.state,
      created_at: product.createdAt,
      images: product.images, // frontend me ImageTransition me `images` use ho rha hai
      user: product.sellerName, // depends on how seller info store kiya hai
      user_name: product.sellerName,
      phone: product.mobileNumber,
      display_photo: product.images?.[0] || null,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

//get user ads
router.get("/userads", authMiddleware, async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const product = await Product.find({ userId });
    const formattedProducts = product.map((p) => {
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
    return res.status(200).json({
      products: formattedProducts,
      total_count: formattedProducts.length,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
});


//delete ads
router.get("/removead", async(req, res)=>{
  const _id = req.query.id;
  try{
    if(!_id) return res.status(400).json({message:"Product id is required"});
    const result = await Product.deleteOne({_id});

    if(result.deletedCount === 0){
      return res.status(404).json({message:"Product not found"});
    }

    await Wishlist.deleteMany({product_id:_id});
    res.status(200).json({message:"Product deleted successfully"});
  }
  catch(error){
    res.status(500).json({message:"Server error",error});
  }

});

//edit ads
router.post('/editads',upload.array("photos"),async(req,res)=>{
  try{
const {
  id,
  category,
  subcategory,
  brand,
  year,
  title,
  description,
  price,
  state,
  city,
  sellerName,
  mobileNumber
} = req.body;

  if (!id) {
        return res.status(400).json({ message: "Product ID is required" });
      }
  const newImages = (req.files as Express.Multer.File[]).map(file => `uploads/${file.filename}`);

  const product = await Product.findById(id);
  if(!product) {
    return res.status(404).json({message: "Product not found"});
  }

  
  const images = newImages.length > 0 ? newImages : product.images;

  product.brand = brand ?? product.brand;
      product.year = year ?? product.year;
      product.title = title ?? product.title;
      product.description = description ?? product.description;
      product.price = price ?? product.price;
      product.state = state ?? product.state;
      product.city = city ?? product.city;
      product.sellerName = sellerName ?? product.sellerName;
      product.mobileNumber = mobileNumber ?? product.mobileNumber;
      product.category = category ?? product.category;
      product.subcategory = subcategory ?? product.subcategory;
      product.images = images;

  await product.save();

  return res.status(200).json({message:"Product updated successfully", product});
  }
  catch(error){
res.status(500).json({message:"Server Error"});
  }
});

export default router;
