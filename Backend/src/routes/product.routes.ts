import express from "express";
import Product from "../models/product.model";
import { upload } from "../middleware/uploadImage";

const router = express.Router();

router.post("/putad", upload.array("photos"), async (req, res) => {
  try {
    const {
      brand, year, title, description, price, state, city, sellerName, mobileNumber, category,
      subcategory
    } = req.body;

    const photos = req.files
      ? (req.files as Express.Multer.File[]).map((file) => file.path)
      : [];

    const product = new Product({
      brand, year, title, description, price, photos,
      state, city, sellerName, mobileNumber,
      category, subcategory
    });

    await product.save();

    res.status(201).json({ message: "Product added successfull", product });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});
export default router;
