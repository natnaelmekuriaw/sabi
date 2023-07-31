"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMultipleProduct = exports.addProduct = exports.removeProduct = exports.updateProduct = exports.getOneProduct = exports.getProducts = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.default.findAll();
        console.log("Got products", products);
        res.json(products);
    }
    catch (err) {
        console.log("Server error", err);
        res.send("Server error");
    }
});
exports.getProducts = getProducts;
const getOneProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const product = yield product_model_1.default.findByPk(id);
        console.log("Got products", product);
        res.json(product);
    }
    catch (err) {
        console.log("Server error", err);
        res.send("Server error");
    }
});
exports.getOneProduct = getOneProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    const product = req.body;
    try {
        const newProduct = yield product_model_1.default.update({
            itemNo: product.itemNo,
            description: product.description,
            quantity: product.quantity,
            amount: product.amount,
        }, {
            where: {
                id: productId,
            },
        });
        if (newProduct)
            res.status(200).json("Product updated successfully");
        else
            res.status(400).json("Product can not be found");
    }
    catch (err) {
        res.status(500).json("failed to update product");
    }
});
exports.updateProduct = updateProduct;
const removeProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    try {
        const newProduct = yield product_model_1.default.destroy({
            where: {
                id: productId,
            },
        });
        const products = yield product_model_1.default.findAll();
        if (newProduct)
            res.status(200).json(products);
        else
            res.status(400).json("Product can not be found");
    }
    catch (err) {
        res.status(500).json("failed to delete product");
    }
});
exports.removeProduct = removeProduct;
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = req.body;
    try {
        const newProduct = yield product_model_1.default.upsert(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(500).json("failed to add new product");
    }
});
exports.addProduct = addProduct;
const addMultipleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    if (data.massData.length > 0) {
        try {
            const products = data.massData;
            const productsMass = products.map((product) => product_model_1.default.upsert(product));
            yield Promise.all(productsMass);
        }
        catch (err) {
            // res.status(500).json("failed to add new product");
        }
        const allProducts = yield product_model_1.default.findAll();
        res.status(201).json(allProducts);
    }
});
exports.addMultipleProduct = addMultipleProduct;
