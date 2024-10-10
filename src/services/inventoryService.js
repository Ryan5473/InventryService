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
exports.deleteProduct = exports.getAllProducts = exports.addProduct = void 0;
const inventoryModel_1 = require("../models/inventoryModel");
const addProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, quantity, category } = product;
    try {
        const result = yield inventoryModel_1.client.query('INSERT INTO inventory (name, description, price, quantity, category) VALUES ($1, $2, $3, $4, $5) RETURNING id', [name, description, price, quantity, category]);
        return result.rows[0];
    }
    catch (err) {
        console.error('Error adding product:', err);
        throw new Error('Failed to add product');
    }
});
exports.addProduct = addProduct;
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield inventoryModel_1.client.query('SELECT * FROM inventory');
        return result.rows;
    }
    catch (err) {
        console.error('Error fetching products:', err);
        throw new Error('Failed to fetch products');
    }
});
exports.getAllProducts = getAllProducts;
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield inventoryModel_1.client.query('DELETE FROM inventory WHERE id = $1', [id]);
    }
    catch (err) {
        console.error('Error deleting product:', err);
        throw new Error('Failed to delete product');
    }
});
exports.deleteProduct = deleteProduct;
