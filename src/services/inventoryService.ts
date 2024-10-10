/*import {client} from '../models/inventoryModel';

interface Product {
    name: string;
    description: string;
    price: number;
    quantity: number;  // Added missing field
    category: string;
}

export const addProduct = async (product: Product) => {
    const { name, description, price, quantity, category } = product;
    try {
        const result = await client.query(
            'INSERT INTO inventory (name, description, price, quantity, category) VALUES ($1, $2, $3, $4, $5) RETURNING id',
            [name, description, price, quantity, category]
        );
        return result.rows[0];
    } catch (err) {
        console.error('Error adding product:', err);
        throw new Error('Failed to add product');
    }
};

export const getAllProducts = async () => {
    try {
        const result = await client.query('SELECT * FROM inventory');
        return result.rows;
    } catch (err) {
        console.error('Error fetching products:', err);
        throw new Error('Failed to fetch products');
    }
};

export const deleteProduct = async (id: number) => {
    try {
        await client.query('DELETE FROM inventory WHERE id = $1', [id]);
    } catch (err) {
        console.error('Error deleting product:', err);
        throw new Error('Failed to delete product');
    }
};
*/import { Inventory } from '../models/inventoryModel';

interface Product {
    name: string;
    description: string;
    price: number;
    quantity: number;
    category: string;
}

export const addProduct = async (product: Product) => {
    const { name, description, price, quantity, category } = product;
    try {
        const newProduct = await Inventory.create({
            name,
            description,
            price,
            quantity,
            category
        });
        return { id: newProduct.id };  // Now TypeScript recognizes `id`
    } catch (err) {
        console.error('Error adding product:', err);
        throw new Error('Failed to add product');
    }
};

export const getAllProducts = async () => {
    try {
        const products = await Inventory.findAll();
        return products;
    } catch (err) {
        console.error('Error fetching products:', err);
        throw new Error('Failed to fetch products');
    }
};

export const deleteProduct = async (id: number) => {
    try {
        await Inventory.destroy({
            where: { id }
        });
    } catch (err) {
        console.error('Error deleting product:', err);
        throw new Error('Failed to delete product');
    }
};
