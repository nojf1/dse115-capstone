import { Request, Response } from "express";
import Product from "../models/products";

// Helper function to format product data
const formatProductData = (product: any) => {
  return {
    ...product.toJSON(),
    price: Number(product.price)
  };
};

// Get all products (public)
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    console.log("Attempting to fetch all products...");
    
    const products = await Product.findAll();
    console.log("Products found:", products.length);
    
    // Format all products to ensure price is a number
    const formattedProducts = products.map(formatProductData);
    
    res.status(200).json({
      message: "Products retrieved successfully",
      products: formattedProducts,
    });
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      message: "Server error",
      error: errorMessage,
      details: error instanceof Error ? error.stack : undefined,
    });
  }
};

// Get product by ID (public)
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product retrieved successfully",
      product: formatProductData(product),
    });
  } catch (error) {
    console.error("Error in getProductById:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      message: "Server error",
      error: errorMessage,
      details: error instanceof Error ? error.stack : undefined,
    });
  }
};

// Create new product (admin only)
export const createProduct = async (req: Request, res: Response) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }

    const { name, description, price, category, stock_quantity, image_url } = req.body;

    // Validate required fields
    if (!name || price === undefined || !category) {
      return res.status(400).json({ 
        message: "Name, price, and category are required" 
      });
    }

    // Ensure price is stored as a number
    const numericPrice = Number(price);
    if (isNaN(numericPrice)) {
      return res.status(400).json({ 
        message: "Price must be a valid number" 
      });
    }

    const newProduct = await Product.create({
      name,
      description,
      price: numericPrice,
      category,
      stock_quantity: stock_quantity || 0,
      image_url,
    });

    res.status(201).json({
      message: "Product created successfully",
      product: formatProductData(newProduct),
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};

// Update product (admin only)
export const updateProduct = async (req: Request, res: Response) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }

    const { id } = req.params;
    const { name, description, price, category, stock_quantity, image_url } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Convert price to number if provided
    const numericPrice = price ? Number(price) : undefined;
    if (price !== undefined && isNaN(numericPrice!)) {
      return res.status(400).json({ 
        message: "Price must be a valid number" 
      });
    }

    await product.update({
      name: name || product.name,
      description: description || product.description,
      price: numericPrice || product.price,
      category: category || product.category,
      stock_quantity: stock_quantity !== undefined ? stock_quantity : product.stock_quantity,
      image_url: image_url || product.image_url,
    });

    res.status(200).json({
      message: "Product updated successfully",
      product: formatProductData(product),
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};

// Delete product (admin only)
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }

    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.destroy();

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};
