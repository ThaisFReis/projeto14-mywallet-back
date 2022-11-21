import dotenv from "dotenv";
import { MongoClient } from 'mongodb';

dotenv.config();

// Database
const dbUrl = process.env.DB_URL;
const dbName = process.env.DB_NAME
const mongoClient = new MongoClient(dbUrl);
const db = mongoClient.db(dbName);

// Database connection
mongoClient.connect().then(() => {
    db;
    console.log("Database connected");
}).catch((err) => {
    console.log(err);
});

export default db;