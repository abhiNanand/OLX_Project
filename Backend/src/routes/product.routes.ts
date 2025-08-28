import express from "express";
import Product from "../models/product.model";
import { upload } from "../middleware/uploadImage";

const router = express.Router();

//add product to sell
router.post("/putad", upload.array("photos"), async (req, res) => {
  try {
    const {
      brand, year, title, description, price, state, city, sellerName, mobileNumber, category,
      subcategory
    } = req.body;

    const images = (req.files as Express.Multer.File[]).map(file =>`uploads/${file.filename}`);
      

    const product = new Product({
      brand, year, title, description, price, images,
      state, city, sellerName, mobileNumber,
      category, subcategory
    });

    await product.save();

    res.status(201).json({ message: "Product added successfull", product });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

router.get("/list", async (req, res) => {
  try {
    let { page = 1, limit = 20, search = "" } = req.query;

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
        { state: { $regex: search, $options: "i" } }
      ];
    }

    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Map products into frontend expected format
    const formattedProducts = products.map((p) => ({
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
      images: p.images,              // rename photos -> images
      display_photo: p.images?.[0] || null,  // first image
      user:   p.sellerName,
      user_name: p.sellerName,
      phone: p.mobileNumber,
     }));

    res.status(200).json(formattedProducts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


router.get("/item", async(req, res)=>{
   try{
    const {id}= req.query;

    if(!id)
      return res.status(400).json({message:"Product id is required"});
    const product = await Product.findById(id);
    if(!product)
      return res.status(404).json({message:"Product not found"});
    res.status(200).json({ id: product._id,
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
      user:  product.sellerName, // depends on how seller info store kiya hai
      user_name: product.sellerName,
      phone: product.mobileNumber,
      display_photo: product.images?.[0] || null,
    });
   }
   catch (error) {
    res.status(500).json({ message: "Server error", error });
  }

});

export default router;
