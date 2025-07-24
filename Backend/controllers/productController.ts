import { Request, Response } from "express";
import {Product} from "../models/Product";

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, imageUrl, description, price, category, stock } = req.body;

    // Validate input
    if (!name || !imageUrl || !description || !price || !category || !stock) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Sprawdzenie czy uzytkownik istnieje
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }

    // Tworzenie nowego produktu
    const newProduct = new Product({
      name,
      imageUrl,
      description,
      price,
      category,
      stock,
      owner: req.user?.userId
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().populate("owner", "username");
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};