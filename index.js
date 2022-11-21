import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import registerRouter from './routes/registerRouter.js';
import authRouter from './routes/authRouter.js';

dotenv.config();

// Server
const app = express();
app.use(cors());
app.use(json());

// Routers
app.use(authRouter);
app.use(registerRouter);

app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});