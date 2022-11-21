import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import registerRouter from './routes/registerRouter.js';
import authRouter from './routes/authRouter.js';
import entriesRouter from './routes/entriesRouter.js';

dotenv.config();

// Server
const app = express();
app.use(cors());
app.use(json());

// Routers
app.use(authRouter);
app.use(registerRouter);
app.use(entriesRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});