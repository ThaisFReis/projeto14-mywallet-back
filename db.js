import dotenv from "dotenv";
import { MongoClient } from 'mongodb';

dotenv.config();

// Database
const dbUrl = process.env.MONGO_URI || "mongodb://localhost:27017";
const dbName = process.env.DB_NAME
const mongoClient = new MongoClient(dbUrl, { useUnifiedTopology: true });
const db = mongoClient.db(dbName);

// Database connection
mongoClient.connect().then(() => {
    db;
    console.log("Database connected");
}).catch((err) => {
    console.log(err);
});

export default db;
