"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const inventoryController_1 = require("./controllers/inventoryController");
// Load environment variables from .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3003;
// Middleware to parse JSON bodies
app.use(body_parser_1.default.json());
// Route handlers
app.post('/api/products', inventoryController_1.addProductController);
app.get('/api/products', inventoryController_1.getProductsController);
app.delete('/api/products/:id', inventoryController_1.deleteProductController);
// Register global error handler
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = app;
