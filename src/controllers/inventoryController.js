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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductController = exports.getProductsController = exports.addProductController = void 0;
const inventoryService_1 = require("../services/inventoryService");
const addProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, quantity, category } = req.body;
        if (!name || !description || !price || !quantity || !category) {
            return res.status(400).json({ error: 'All fields are required.' });
        }
        const product = yield (0, inventoryService_1.addProduct)({ name, description, price, quantity, category });
        res.status(201).json({ message: 'Product added successfully', product });
    }
    catch (err) {
        console.error('Error adding product:', err); // Log the error for debugging
        res.status(500).json({ error: 'Failed to add product', details: 'error1' });
    }
});
exports.addProductController = addProductController;
const getProductsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, inventoryService_1.getAllProducts)();
        res.status(200).json(products);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch products', details: 'error' });
    }
});
exports.getProductsController = getProductsController;
const deleteProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid product ID' });
        }
        yield (0, inventoryService_1.deleteProduct)(id);
        res.status(200).json({ message: 'Product deleted successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete product', details: 'eerror' });
    }
});
exports.deleteProductController = deleteProductController;
