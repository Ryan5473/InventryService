/*import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect()
    .then(() => console.log('Connected to PostgreSQL successfully'))
    .catch((err) => console.error('Failed to connect to PostgreSQL', err));

interface Inventory {
    id?: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    category: string;
    created_at?: Date;
}

export { client, Inventory };
*/import { Sequelize, DataTypes, Model } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../src/.env') });

const sequelize = new Sequelize(process.env.DATABASE_URL || '', {
    dialect: 'postgres',
    logging: false,
});

// Define the attributes of the Inventory
interface InventoryAttributes {
    id?: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    category: string;
}

// Define the Inventory model
class Inventory extends Model<InventoryAttributes> implements InventoryAttributes {
    public id!: number;
    public name!: string;
    public description!: string;
    public price!: number;
    public quantity!: number;
    public category!: string;
}

Inventory.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'inventory',
    timestamps: false,
});

// Sync the database model
sequelize.sync()
    .then(() => {
        console.log("Inventory table synced successfully.");
    })
    .catch((err) => {
        console.error("Error syncing Inventory table:", err);
    });

export { sequelize, Inventory };
