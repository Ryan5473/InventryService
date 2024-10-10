/*import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { addProductController, getProductsController, deleteProductController } from './controllers/inventoryController';


// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route handlers
app.post('/api/products', addProductController);
app.get('/api/products', getProductsController);
app.delete('/api/products/:id', deleteProductController);

// Register global error handler


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
*/
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { addProductController, getProductsController, deleteProductController } from './controllers/inventoryController';
import { sequelize } from './models/inventoryModel';  // Import Sequelize instance

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Test database connection
sequelize.authenticate()
    .then(() => console.log('Database connected successfully.'))
    .catch((err) => console.error('Unable to connect to the database:', err));

// Route handlers
app.post('/api/products', addProductController);
app.get('/api/products', getProductsController);
app.delete('/api/products/:id', deleteProductController);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;
