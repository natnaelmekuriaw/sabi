"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const router = express_1.default.Router();
router.get("/", productController_1.getProducts);
router.get("/:id", productController_1.getOneProduct);
router.delete("/:id", productController_1.removeProduct);
router.put("/:id", productController_1.updateProduct);
router.post("/", productController_1.addProduct);
router.post("/mass", productController_1.addMultipleProduct);
exports.default = router;
