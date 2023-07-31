import { Request, Response } from "express";
import Product from "../models/product.model";
import { ProductAttributes } from "../../types/types";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    console.log("Got products", products);
    res.json(products);
  } catch (err) {
    console.log("Server error", err);
    res.send("Server error");
  }
};

export const getOneProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    console.log("Got products", product);
    res.json(product);
  } catch (err) {
    console.log("Server error", err);
    res.send("Server error");
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const product = req.body;

  try {
    const newProduct = await Product.update(
      {
        itemNo: product.itemNo,
        description: product.description,
        quantity: product.quantity,
        amount: product.amount,
      },
      {
        where: {
          id: productId,
        },
      }
    );
    if (newProduct) res.status(200).json("Product updated successfully");
    else res.status(400).json("Product can not be found");
  } catch (err) {
    res.status(500).json("failed to update product");
  }
};

export const removeProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;
  try {
    const newProduct = await Product.destroy({
      where: {
        id: productId,
      },
    });
    const products = await Product.findAll();
    if (newProduct) res.status(200).json(products);
    else res.status(400).json("Product can not be found");
  } catch (err) {
    res.status(500).json("failed to delete product");
  }
};

export const addProduct = async (req: Request, res: Response) => {
  const product = req.body;
  try {
    const newProduct = await Product.upsert(product);
    res.json(newProduct);
  } catch (err) {
    res.status(500).json("failed to add new product");
  }
};

export const addMultipleProduct = async (req: Request, res: Response) => {
  const data = req.body;
  if (data.massData.length > 0) {
    const products = data.massData;
    products.forEach(async (product: ProductAttributes) => {
      try {
        const newProduct = await Product.upsert(product);
      } catch (err) {
        // res.status(500).json("failed to add new product");
      }
    });
    const allProducts = await Product.findAll();
    res.status(201).json(allProducts);
  }
};
