import express from "express";
import {
  getProducts,
  getOneProduct,
  addProduct,
  removeProduct,
  updateProduct,
  addMultipleProduct,
} from "../controllers/productController";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getOneProduct);
router.delete("/:id", removeProduct);
router.put("/:id", updateProduct);
router.post("/", addProduct);
router.post("/mass", addMultipleProduct);

export default router;
