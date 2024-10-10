import { Request, Response } from 'express';
import { addProduct, getAllProducts, deleteProduct } from '../services/inventoryService';

export const addProductController = async (req: Request, res: Response) => {
    try {
        const { name, description, price, quantity, category } = req.body;

        if (!name || !description || !price || !quantity || !category) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const product = await addProduct({ name, description, price, quantity, category });
        res.status(201).json({ message: 'Product added successfully', product });
    } catch (err) {
        console.error('Error adding product:', err); // Log the error for debugging
        res.status(500).json({ error: 'Failed to add product', details: 'error1' });
    }
};

export const getProductsController = async (req: Request, res: Response) => {
    try {
        const products = await getAllProducts();
        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch products', details: 'error' });
    }
};

export const deleteProductController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid product ID' });
        }

        await deleteProduct(id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete product', details: 'eerror' });
    }
};
